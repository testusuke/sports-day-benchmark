package graph

import "sports-day/api/service"

// This file will not be regenerated automatically.
//
// It serves as dependency injection for your app, add any dependencies you require here.

type Resolver struct {
	UserService *service.User
	AuthService *service.AuthService
}

func NewResolver(
	userService *service.User,
	authService *service.AuthService,
) *Resolver {
	return &Resolver{
		UserService: userService,
		AuthService: authService,
	}
}
