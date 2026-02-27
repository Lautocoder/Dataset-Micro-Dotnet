using Dataset_Manager.Clients;
using Dataset_Manager.Clients.impl;
using Dataset_Manager.Context;
using Dataset_Manager.Mapper;
using Dataset_Manager.Models;
using Dataset_Manager.Repositories;
using Dataset_Manager.Repositories.impl;
using Dataset_Manager.Services;
using Dataset_Manager.Services.impl;
using Microsoft.EntityFrameworkCore;
using Polly;
using Polly.CircuitBreaker;
using Polly.Extensions.Http;

namespace Dataset_Manager.Extensions
{
    public static class Extensions
    {
        public static IServiceCollection AddServices(this IServiceCollection services, IConfiguration config, string ConnectionString)
        {
            services.AddDbContext<DataContext>(options =>
            {
                options.UseNpgsql(ConnectionString);//.LogTo(Console.WriteLine, LogLevel.Debug);
            });

            var baseUrl = config["GeneratorService:BaseUrl"]; // ex: https://localhost:9091
            if (string.IsNullOrWhiteSpace(baseUrl))
                throw new InvalidOperationException("Missing config: GeneratorService:BaseUrl");

            // Policy: circuit breaker
            IAsyncPolicy<HttpResponseMessage> breaker =
                HttpPolicyExtensions
                    .HandleTransientHttpError()
                    .Or<BrokenCircuitException<HttpResponseMessage>>()
                    .CircuitBreakerAsync(
                        handledEventsAllowedBeforeBreaking: 3,
                        durationOfBreak: TimeSpan.FromSeconds(20));

            services.AddHttpClient<IGeneratorClient, GeneratorClient>(client =>
            {
                client.BaseAddress = new Uri(baseUrl);
                client.Timeout = TimeSpan.FromSeconds(30);
            }).AddPolicyHandler(breaker);

            services.AddScoped<IRepository<Project>, Repository<Project>>();
            services.AddScoped<IRepository<EntityDefinition>, Repository<EntityDefinition>>();
            services.AddScoped<IRepository<AttributeDefinition>, Repository<AttributeDefinition>>();

            services.AddAutoMapper(cfg =>
            {
                cfg.AddProfile<MapperConfig>();
            });

            services.AddScoped<IProjectService, ProjectService>();
            services.AddScoped<IEntityService, EntityService>();
            services.AddScoped<IAttributeService, AttributeService>();
            services.AddScoped<IGeneratorFacade, GeneratorFacade>();


            return services;
        }
    }
}
