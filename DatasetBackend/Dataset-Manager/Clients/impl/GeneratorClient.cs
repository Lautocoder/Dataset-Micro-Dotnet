using Dataset_Manager.Dtos;
using static System.Net.WebRequestMethods;

namespace Dataset_Manager.Clients.impl
{
    public class GeneratorClient(HttpClient http) : IGeneratorClient
    {
        private readonly HttpClient _http = http;

        public async Task<Dataset> GenerateAsync(ProjectDto projectDto, long count, CancellationToken ct = default)
        {
            var url = $"/api/generate?count={count}";
            var resp = await _http.PostAsJsonAsync(url, projectDto, ct);
            resp.EnsureSuccessStatusCode();
            return (await resp.Content.ReadFromJsonAsync<Dataset>(cancellationToken: ct))!;
        }
    }
}
