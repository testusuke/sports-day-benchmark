package main

import (
	"fmt"
	"log"

	"sports-day/api/pkg/env"
)

func main() {
	if err := env.Load(); err != nil {
		log.Fatalf("Failed to load environment variables: %v", err)
	}

	fmt.Println("Hello, World!")
}
