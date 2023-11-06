require 'oauth2'
require 'dotenv/load'

client_id = ENV['CLIENT_ID']
client_secret = ENV['CLIENT_SECRET']

client = OAuth2::Client.new(client_id, client_secret, site: ENV['TOKEN_HOST'], token_url: ENV['TOKEN_PATH'])
begin
  token = client.client_credentials.get_token
  puts "Access Token: #{token.token}"
rescue OAuth2::Error => e
  puts "Error fetching token: #{e.response.status}"
  puts "Response body: #{e.response.body}"
end

