package middleware

import (
	"net/http"

	"github.com/justinas/alice"
)

func SetupMiddleware(handler http.Handler) http.Handler {
	chain := alice.New()
	chain = chain.Append(CORS().Handler)

	return chain.Then(handler)
}
