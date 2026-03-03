using Auth_Service.Context;
using Microsoft.EntityFrameworkCore;

namespace Auth_Service.Extensions
{
    public static class Extensions
    {
        public static IServiceCollection AddServices(this IServiceCollection services, IConfiguration config, string ConnectionString)
        {
            services.AddDbContext<DataContext>(options =>
            {
                options.UseNpgsql(ConnectionString);//.LogTo(Console.WriteLine, LogLevel.Debug);
            });


            //services.AddAutoMapper(cfg =>
            //{
            //    cfg.AddProfile<MapperConfig>();
            //});


            return services;
        }

    }
}
