const { ClientCredentials } = require('simple-oauth2');

async function getToken () {
  const config = {
    client: {
      id: process.env.CLIENT_ID,
      secret: process.env.CLIENT_SECRET
    },
    auth: {
      tokenHost: process.env.TOKEN_HOST,
      tokenPath: process.env.TOKEN_PATH
    }
  };

  const client = new ClientCredentials(config);

  try {
    const accessToken = await client.getToken();
    return accessToken.token.access_token;
  } catch (error) {
    console.error('Access Token Error', error.message);
    return null;
  }
}

module.exports = { getToken };
