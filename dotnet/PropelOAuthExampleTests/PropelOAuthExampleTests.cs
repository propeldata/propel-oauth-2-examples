using System.Net.Http;
using System.Threading.Tasks;
using Xunit;
using dotenv.net;
using PropelOAuthExampleApp;

namespace PropelOAuthExampleTests
{
    public class TokenServiceTests
    {
        [Fact]
        public async Task GetTokenAsync_Returns_Token()
        {
            DotEnv.Load();
            
            var clientId = Environment.GetEnvironmentVariable("CLIENT_ID");
            var clientSecret = Environment.GetEnvironmentVariable("CLIENT_SECRET");
            var tokenHost = Environment.GetEnvironmentVariable("TOKEN_HOST");
            var tokenPath = Environment.GetEnvironmentVariable("TOKEN_PATH");

            // Arrange
            var httpClient = new HttpClient();
            var tokenService = new TokenService(httpClient);

            var address = $"{tokenHost}{tokenPath}";

            // Act
            var token = await tokenService.GetTokenAsync(
                address,
                clientId,
                clientSecret
            );

            Console.WriteLine($"Token: {token}");

            // Assert
            Assert.NotNull(token);
        }
    }
}
