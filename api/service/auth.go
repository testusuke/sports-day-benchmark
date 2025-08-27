package service

import (
	"context"
	"fmt"

	"gorm.io/gorm"

	"sports-day/api/db_model"
	"sports-day/api/graph/model"
	"sports-day/api/pkg/auth"
	"sports-day/api/pkg/errors"
	"sports-day/api/pkg/ulid"
	"sports-day/api/repository"
)

// AuthService 認証サービス
type AuthService struct {
	db       *gorm.DB
	userRepo repository.User
	oidc     auth.OIDC
	jwt      auth.JWT
}

// NewAuthService 新しい認証サービスを作成
func NewAuthService(db *gorm.DB, userRepo repository.User, oidc auth.OIDC, jwt auth.JWT) AuthService {
	return AuthService{
		db:       db,
		userRepo: userRepo,
		oidc:     oidc,
		jwt:      jwt,
	}
}

// Login IDトークンを検証してJWTを発行
func (s *AuthService) Login(ctx context.Context, code string, redirectURL string) (*model.AuthResponse, error) {
	tokenData, err := s.oidc.Authenticate(ctx, code, redirectURL)
	if err != nil {
		return nil, errors.Wrap(err)
	}

	if tokenData.Email == "" {
		return nil, errors.Wrap(fmt.Errorf("email not found in token"))
	}

	user, err := s.userRepo.FindByEmail(ctx, s.db, tokenData.Email)
	if err != nil {
		if !errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, errors.Wrap(err)
		}

		// if user not found, create new user
		user = &db_model.User{
			ID:    ulid.Make(),
			Name:  tokenData.Name,
			Email: tokenData.Email,
		}
		user, err = s.userRepo.Save(ctx, s.db, user)
		if err != nil {
			return nil, errors.Wrap(err)
		}
	} else {
		// if user exists, update name (if necessary)
		if user.Name != tokenData.Name {
			user.Name = tokenData.Name
			user, err = s.userRepo.Save(ctx, s.db, user)
			if err != nil {
				return nil, errors.Wrap(err)
			}
		}
	}

	token, err := s.jwt.Generate(&auth.TokenData{
		UserID: user.ID,
		Email:  user.Email,
		Name:   user.Name,
	})
	if err != nil {
		return nil, errors.Wrap(err)
	}

	return &model.AuthResponse{
		Token: token,
		User: &model.User{
			ID:    user.ID,
			Name:  user.Name,
			Email: user.Email,
		},
	}, nil
}

// GetCurrentUser 現在のユーザー情報を取得
func (s *AuthService) GetCurrentUser(ctx context.Context) (*db_model.User, error) {
	// get user id from middleware
	user_id, ok := auth.GetUserID(ctx)
	if !ok {
		return nil, nil
	}

	// get user info by email
	user, err := s.userRepo.Get(ctx, s.db, user_id)
	if err != nil {
		if err == gorm.ErrRecordNotFound {
			return nil, nil
		}
		return nil, err
	}

	return user, nil
}
