package errors

import (
	"errors"
	"fmt"
)

type Error interface {
	Code() string
	Message() string
	Error() string
	WithError(e error) Error
	WithMessage(message string) Error
	Is(reference error) bool
}

type err struct {
	code    string
	message string
	err     error
}

type ErrorOption func(*err)

func NewError(code string, message string) Error {
	e := err{code: code, message: message, err: fmt.Errorf("")}
	return e
}

func (s err) Code() string {
	return s.code
}

func (s err) Error() string {
	return fmt.Errorf("%s: %s %w", s.code, s.message, s.err).Error()
}

func (s err) Message() string {
	return s.message
}

func (s err) WithError(e error) Error {
	s.err = e
	return s
}

func (s err) WithMessage(message string) Error {
	s.message = message
	return s
}

func (s err) Is(e error) bool {
	var err Error
	if errors.As(e, &err) {
		return s.Code() == err.Code()
	}
	return false
}

func (s err) Unwrap() error {
	return s.err
}
