import { getAccessToken } from './getToken';
import { getEnvVariable } from './utils';

describe('OAuth Token Retrieval', () => {
  it('retrieves an access token', async () => {
    const token = await getAccessToken(getEnvVariable('CLIENT_ID'), getEnvVariable('CLIENT_SECRET'), getEnvVariable('TOKEN_HOST'), getEnvVariable('TOKEN_PATH'));
    expect(token).toBeDefined();
    expect(token.access_token).toBeDefined();
    console.log(token.access_token);
  });
});


