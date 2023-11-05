use dotenv::dotenv;
use serde::{Serialize, Deserialize};
use reqwest::Client;

#[derive(Deserialize, Debug)]
struct AuthConfig {
    client_id: String,
    client_secret: String,
    token_host: String,
    token_path: String,
}

#[derive(Serialize)]
pub struct AuthParams {
    pub grant_type: String,
    pub client_id: String,
    pub client_secret: String,
}

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    dotenv().ok(); // This loads the .env file

    // Use envy to deserialize the environment variables into AuthConfig
    let auth_config: AuthConfig = match envy::from_env::<AuthConfig>() {
        Ok(config) => config,
        Err(error) => panic!("Couldn't read .env file: {:?}", error),
    };

    let token_url = format!("{}{}", auth_config.token_host, auth_config.token_path);

    let auth_params = AuthParams {
        grant_type: "client_credentials".to_string(),
        client_id: auth_config.client_id,
        client_secret: auth_config.client_secret,
    };

    // Set up the request client and make the request
    let client = Client::new();
    let res = client
        .post(&token_url)
        .form(&auth_params)
        .send()
        .await?;

    let auth_response = res.text().await?;

    println!("Auth Response: {}", auth_response);
    Ok(())
}
