package main

import (
	"context"
	"fmt"
	"log"
	"os"

	"github.com/joho/godotenv"
	"golang.org/x/oauth2/clientcredentials"
)

func getToken() (string, error) {
	// Load .env file from the same directory as the main.go file
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}
	ctx := context.Background()

	conf := &clientcredentials.Config{
		ClientID:     os.Getenv("CLIENT_ID"),
		ClientSecret: os.Getenv("CLIENT_SECRET"),
		TokenURL:     fmt.Sprintf("%s%s", os.Getenv("TOKEN_HOST"), os.Getenv("TOKEN_PATH")),
	}

	token, err := conf.Token(ctx)
	if err != nil {
		return "", err
	}

	return token.AccessToken, nil
}

func main() {
	accessToken, err := getToken()
	if err != nil {
		fmt.Printf("Access Token Error: %s\n", err)
	} else {
		fmt.Printf("Access Token: %s\n", accessToken)
	}
}
