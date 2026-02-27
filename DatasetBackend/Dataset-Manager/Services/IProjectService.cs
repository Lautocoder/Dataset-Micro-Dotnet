using Dataset_Manager.Dtos;

namespace Dataset_Manager.Services
{
    public interface IProjectService
    {
        Task<List<ProjectDto>> GetAllProjects();
        Task<ProjectDto?> GetProjectById(long id);
        Task<ProjectDto> CreateProject(CreateProjectDto createProjectDto);
        Task<ProjectDto?> UpdateProject(long id, UpdateProjectDto updateProjectDto);
        Task DeleteProject(long id);
    }
}
