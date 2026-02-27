using System.Linq.Expressions;

namespace Dataset_Manager.Repositories
{
    public interface IRepository<T> where T : class
    {
        Task<T> GetAsync(Expression<Func<T, bool>>? filter = null,
            string? includeProperties = null, bool isTracking = true);

        Task<bool> ExistAsync(Expression<Func<T, bool>> filter);

        Task<List<T>> GetAllAsync(Expression<Func<T, bool>>? filter = null,
            Func<IQueryable<T>, IOrderedQueryable<T>>? orderBy = null,
            string? includeProperties = null,
            bool isTracking = true);
        Task<long> CountAsync(Expression<Func<T, bool>>? filter = null);

        Task<T> CreateAsync(T entity);

        Task<List<T>> AddRangeAsync(List<T> entiies);

        T Update(T entity);

        void Remove(T entity);
        void RemoveRange(IEnumerable<T> entities);

        Task SaveAsync();

    }
}
