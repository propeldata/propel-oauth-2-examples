// token_test.go

package main

import (
	"fmt"
	"testing"
)

func TestGetToken(t *testing.T) {
	token, err := getToken()
	fmt.Printf("Access Token: %s\n", token)
	if err != nil {
		t.Errorf("Failed to get token: %s", err)
	}
	if token == "" {
		t.Errorf("Token is empty")
	}
}
