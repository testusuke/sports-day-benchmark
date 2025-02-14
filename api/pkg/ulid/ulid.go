package ulid

import (
	"math/rand"
	"sync"
	"time"

	"sports-day/api/pkg/errors"

	"github.com/oklog/ulid/v2"
)

var (
	mu      sync.Mutex
	entropy = ulid.Monotonic(rand.New(rand.NewSource(time.Now().UnixNano())), 0)
)

func Make() string {
	mu.Lock()
	defer mu.Unlock()
	return ulid.MustNew(ulid.Now(), entropy).String()
}

func Valid(s string) error {
	if _, err := ulid.Parse(s); err != nil {
		return errors.Wrap(err)
	}
	return nil
}
