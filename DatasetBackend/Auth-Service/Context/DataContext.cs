using Microsoft.EntityFrameworkCore;

namespace Auth_Service.Context
{
    public class DataContext(DbContextOptions<DataContext> options) : DbContext(options)
    {
    }
}
