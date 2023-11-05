using dotenv.net;
using IdentityModel.Client;
using System;
using System.Runtime.CompilerServices;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.Extensions.DependencyInjection;

namespace PropelOAuthExampleApp
{
    class Program
    {
        static async Task Main(string[] args)
        {
            DotEnv.Load();
            
            var clientId = Environment.GetEnvironmentVariable("CLIENT_ID");
            var clientSecret = Environment.GetEnvironmentVariable("CLIENT_SECRET");
            var tokenHost = Environment.GetEnvironmentVariable("TOKEN_HOST");
            var tokenPath = Environment.GetEnvironmentVariable("TOKEN_PATH");
            

            // 'services' is now declared in the same method it's used
            var services = ConfigureServices();
            
            var serviceProvider = services.BuildServiceProvider();
            var tokenService = serviceProvider.GetService<TokenService>();

            var address = $"{tokenHost}{tokenPath}";

            try
            {
                var token = await tokenService.GetTokenAsync(
                    address,
                    clientId,
                    clientSecret
                );
                Console.WriteLine($"Token: {token}");
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error fetching token: {ex.Message}");
            }
        }
        private static IServiceCollection ConfigureServices()
        {
            var services = new ServiceCollection();
            services.AddHttpClient<TokenService>();
            return services;
        }
    }
}

