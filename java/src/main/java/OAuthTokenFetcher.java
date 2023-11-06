package com.example;

import com.github.scribejava.core.builder.ServiceBuilder;
import com.github.scribejava.core.model.OAuth2AccessToken;
import com.github.scribejava.core.oauth.OAuth20Service;
import io.github.cdimascio.dotenv.Dotenv;

import java.util.concurrent.ExecutionException;
import java.io.IOException;

public class OAuthTokenFetcher {

    public static void main(String[] args) throws InterruptedException, ExecutionException, IOException {
        // Load environment variables using java-dotenv
        Dotenv dotenv = Dotenv.load();

        String clientId = dotenv.get("CLIENT_ID");
        String clientSecret = dotenv.get("CLIENT_SECRET");
        String tokenEndpoint = dotenv.get("TOKEN_HOST") + dotenv.get("TOKEN_PATH"); // Full URL to the token endpoint

        // Create OAuth service using ScribeJava
        OAuth20Service service = new ServiceBuilder(clientId)
                .apiSecret(clientSecret)
                .build(new OAuth2Api(tokenEndpoint));

        // Fetch the access token
        OAuth2AccessToken accessToken = service.getAccessTokenClientCredentialsGrant();

        System.out.println("Access Token: " + accessToken.getAccessToken());
    }

    private static class OAuth2Api extends com.github.scribejava.core.builder.api.DefaultApi20 {
        private final String tokenEndpoint;

        public OAuth2Api(String tokenEndpoint) {
            this.tokenEndpoint = tokenEndpoint;
        }

        @Override
        public String getAccessTokenEndpoint() {
            return tokenEndpoint;
        }

        @Override
        protected String getAuthorizationBaseUrl() {
            throw new UnsupportedOperationException("The authorization base URL is not used for client credentials grant.");
        }
    }
}
