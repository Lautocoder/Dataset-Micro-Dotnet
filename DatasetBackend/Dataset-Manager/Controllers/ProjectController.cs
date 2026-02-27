using Dataset_Manager.Dtos;
using Dataset_Manager.Services;
using Dataset_Manager.Services.impl;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Dataset_Manager.Controllers
{
    [Route("api/projects")]
    [ApiController]
    public class ProjectController(IProjectService projectService, IGeneratorFacade generator) : ControllerBase
    {
        private readonly IProjectService _projectService = projectService;
        private readonly IGeneratorFacade _generator = generator;

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] CreateProjectDto createProjectDto)
        {
            try
            {
                var createdProject = await _projectService.CreateProject(createProjectDto);
                return CreatedAtAction(nameof(Get), new { id = createdProject.Id }, createdProject);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                var projects = await _projectService.GetAllProjects();
                return Ok(projects);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            try
            {
                var project = await _projectService.GetProjectById(id);
                if (project == null) return NotFound(new { message = $"Project with ID {id} not found." });

                return Ok(project);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpGet("{id}/preview")]
        public async Task<IActionResult> getPreviewById(int id, [FromQuery] long count)
        {
            try
            {
                var project = await _projectService.GetProjectById(id);
                if (project == null) return NotFound(new { message = $"Project with ID {id} not found." });

                var ds = await _generator.GenerateAsync(project, count);

                return Ok(ds);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }


        [HttpPut("{id}")]
        public async Task<IActionResult> Put(long id, [FromBody] UpdateProjectDto updateProjectDto)
        {
            try
            {
                var updatedProject = await _projectService.UpdateProject(id, updateProjectDto);
                if (updatedProject == null) return NotFound(new { message = $"Project with ID {id} not found."});
                return Ok(updatedProject);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(long id)
        {
            try
            {
                await _projectService.DeleteProject(id);
                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
    }
}
