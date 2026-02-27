using Dataset_Manager.Clients;
using Dataset_Manager.Dtos;

namespace Dataset_Manager.Services.impl
{
    public class GeneratorFacade(IGeneratorClient client) : IGeneratorFacade
    {
        private readonly IGeneratorClient _client = client;

        public async Task<Dataset> GenerateAsync(ProjectDto projectDto, long count, CancellationToken ct = default)
        {
            try
            {
                return await _client.GenerateAsync(projectDto, count, ct);
            }
            catch (Exception)
            {
                // fallback generateFallback
                return new Dataset(
                    projectName: projectDto.Name,
                    count: (int)count,
                    data: []
                )
                {
                    Status = "PARTIAL"
                };
            }
        }
    }
}
