using Dataset_Manager.Dtos;

namespace Dataset_Manager.Clients
{
    public interface IGeneratorClient
    {
        Task<Dataset> GenerateAsync(ProjectDto projectDto, long count, CancellationToken ct = default);
    }
}
