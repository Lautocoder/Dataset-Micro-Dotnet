using Generator_Service.Services;
using Generator_Service.Services.impl;

namespace Generator_Service.Extentions
{
    public static class Extensions
    {
        public static IServiceCollection AddServices(this IServiceCollection services)
        {

            services.AddScoped<IDatasetGeneratorService, DatasetGeneratorService>();

            return services;
        }
    }
}

