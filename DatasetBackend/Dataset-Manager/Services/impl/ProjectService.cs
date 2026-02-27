using AutoMapper;
using Dataset_Manager.Dtos;
using Dataset_Manager.Models;
using Dataset_Manager.Repositories;

namespace Dataset_Manager.Services.impl
{
    public class ProjectService(IRepository<Project> projectRepository, IMapper mapper) : IProjectService
    {
        private readonly IRepository<Project> _projectRepository = projectRepository;
        private readonly IMapper _mapper = mapper;

        public async Task<ProjectDto> CreateProject(CreateProjectDto createProjectDto)
        {
            try
            {
                var project = _mapper.Map<Project>(createProjectDto);  
                var createdProject = await _projectRepository.CreateAsync(project);
                await _projectRepository.SaveAsync();
                return _mapper.Map<ProjectDto>(createdProject);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<List<ProjectDto>> GetAllProjects()
        {
            try
            {
                var projects = await _projectRepository.GetAllAsync(includeProperties: "Entities,Entities.Attributes");
                return _mapper.Map<List<ProjectDto>>(projects);
            }
            catch (Exception)
            {

                throw;
            }
        }

        public async Task<ProjectDto?> GetProjectById(long id)
        {
            try
            {
                var project = await _projectRepository.GetAsync(p=>p.Id==id,includeProperties: "Entities,Entities.Attributes");
                if (project == null)
                {
                    return null;
                }
                return _mapper.Map<ProjectDto>(project);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<ProjectDto?> UpdateProject(long id, UpdateProjectDto updateProjectDto)
        {
            try
            {
                var project = await _projectRepository.GetAsync(p => p.Id == id);
                if (project == null)
                {
                    return null;
                }
                _mapper.Map(updateProjectDto, project);
                var updatedProject = _projectRepository.Update(project);
                await _projectRepository.SaveAsync();
                return _mapper.Map<ProjectDto>(updatedProject);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task DeleteProject(long id)
        {
            try
            {
                var project = await _projectRepository.GetAsync(p => p.Id == id);
                if (project == null)
                {
                    throw new Exception($"Project with id {id} not found.");
                }
                _projectRepository.Remove(project);
                await _projectRepository.SaveAsync();
            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}
