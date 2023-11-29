import { ClientCredentials, type Token } from 'simple-oauth2'

async function getAccessToken (clientId: string, clientSecret: string, tokenHost: string, tokenPath: string): Promise<Token> {
  const config = {
    client: {
      id: clientId,
      secret: clientSecret
    },
    auth: {
      tokenHost,
      tokenPath
    }
  }

  const client = new ClientCredentials(config)
  const accessToken = await client.getToken(config)
  return accessToken.token
}

// Only run this if file is run directly, not if it is imported as a module
if (require.main === module) {
  const clientId = process.env.CLIENT_ID
  const clientSecret = process.env.CLIENT_SECRET
  const tokenHost = process.env.TOKEN_HOST
  const tokenPath = process.env.TOKEN_PATH

  if (!clientId || !clientSecret || !tokenHost || !tokenPath) {
    console.error('Please set the environment variables CLIENT_ID, CLIENT_SECRET, TOKEN_HOST, and TOKEN_PATH.')
    process.exit(1)
  }

  getAccessToken(clientId, clientSecret, tokenHost, tokenPath)
    .then(token => console.log(token))
    .catch(error => console.error('Failed to get access token:', error))
}

export { getAccessToken }
