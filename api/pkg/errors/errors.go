package errors

import "github.com/pkg/errors"

func Wrap(err error) error {
	return errors.Wrap(err, "")
}
