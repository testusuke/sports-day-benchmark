package middleware

import (
	"github.com/rs/cors"

	"sports-day/api/pkg/env"
)

func CORS() *cors.Cors {
	options := cors.Options{
		AllowCredentials: true,
		AllowedHeaders: []string{
			"Origin",
			"Accept",
			"Content-Type",
			"Authorization",
		},
		AllowedMethods: []string{
			"GET",
			"POST",
			"PUT",
			"DELETE",
			"OPTIONS",
		},
		AllowedOrigins: env.Get().Server.CORSOrigins,
		Debug:          false,
	}

	return cors.New(options)
}
