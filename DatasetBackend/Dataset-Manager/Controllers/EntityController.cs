using Dataset_Manager.Dtos;
using Dataset_Manager.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Dataset_Manager.Controllers
{
    [Route("api/entities")]
    [ApiController]
    public class EntityController(IEntityService entityService) : ControllerBase
    {
        private readonly IEntityService _entityService = entityService;
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] CreateEntityDto createEntityDto)
        {
            try
            {
                var createdEntity = await _entityService.CreateEntity(createEntityDto);
                return CreatedAtAction(nameof(Get), new { id = createdEntity.Id }, createdEntity);
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
                var entities = await _entityService.GetAllEntities();
                return Ok(entities);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(long id)
        {
            try
            {
                var entity = await _entityService.GetEntityById(id);
                if (entity == null) return BadRequest(new { message = $"Entity with ID {id} not found" });

                return Ok(entity);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpGet("projects/{id}")]
        public async Task<IActionResult> GetByProjectId(long id)
        {
            try
            {
                var entities = await _entityService.GetEntitiesByProjectId(id);
                if (entities == null) return NotFound(new { message = $"No entities found for project with ID {id}." });
                return Ok(entities);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpGet("{id}/subentities")]
        public async Task<IActionResult> GetByParentEntity(long id)
        {
            try
            {
                var entities = await _entityService.GetEntitiesByParentEntity(id);
                if (entities == null) return NotFound(new { message = $"No sub-entities found for parent entity with ID {id}." });
                return Ok(entities);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Put(long id, [FromBody] UpdateEntityDto updateEntityDto)
        {
            try
            {
                var updatedEntity = await _entityService.UpdateEntity(id, updateEntityDto);
                if (updatedEntity == null) return NotFound(new { message = $"Entity with ID {id} not found." });

                return Ok(updatedEntity);
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
                await _entityService.DeleteEntity(id);
                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }

        }
    }
}
