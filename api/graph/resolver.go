package graph

import "sports-day/api/service"

// This file will not be regenerated automatically.
//
// It serves as dependency injection for your app, add any dependencies you require here.

type Resolver struct{
	UserService *service.User
}

func NewResolver(
	userService *service.User,
) *Resolver {
	return &Resolver {
		UserService: userService,
	}
}
