using Generator_Service.Dtos;
using Generator_Service.Models;

namespace Generator_Service.Services
{
    public interface IDatasetGeneratorService
    {
        Dataset Generate(ProjectDto project, int count);
    }
}
