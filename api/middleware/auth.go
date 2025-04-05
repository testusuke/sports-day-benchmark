package middleware

import (
	"context"
	"net/http"

	"sports-day/api/pkg/auth"
)

type userContextKey struct{}

func Auth(jwt *auth.JWT) func(http.Handler) http.Handler {
	return func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			tokenString, err := auth.GetTokenFromRequest(r)
			if err != nil {
				//	TODO unauthorized
				http.Error(w, "unauthorized", http.StatusUnauthorized)
				return
			}

			tokenData, err := jwt.Validate(tokenString)
			if err != nil {
				//	TODO unauthorized
				http.Error(w, "unauthorized", http.StatusUnauthorized)
				return
			}

			ctx := context.WithValue(r.Context(), userContextKey{}, tokenData.UserID)
			next.ServeHTTP(w, r.WithContext(ctx))
		})
	}
}

func GetUserID(ctx context.Context) (string, bool) {
	switch v := ctx.Value(userContextKey{}).(type) {
	case string:
		return v, true
	default:
		return "", false
	}
}
