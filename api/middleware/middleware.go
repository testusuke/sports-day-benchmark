package middleware

import (
	"net/http"

	"github.com/justinas/alice"

	"sports-day/api/pkg/auth"
)

func SetupMiddleware(handler http.Handler, jwt *auth.JWT) http.Handler {
	chain := alice.New()
	chain = chain.Append(CORS().Handler)
	chain = chain.Append(Auth(jwt))

	return chain.Then(handler)
}
