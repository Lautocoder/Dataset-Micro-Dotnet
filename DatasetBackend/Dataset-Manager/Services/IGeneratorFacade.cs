using Dataset_Manager.Dtos;

namespace Dataset_Manager.Services
{
    public interface IGeneratorFacade
    {
        Task<Dataset> GenerateAsync(ProjectDto projectDto, long count, CancellationToken ct = default);
    }
}
