using Dataset_Manager.Dtos;
using Dataset_Manager.Services;
using Dataset_Manager.Services.impl;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Dataset_Manager.Controllers
{
    [Route("api/attributes")]
    [ApiController]
    public class AttributeController(IAttributeService attributeService) : ControllerBase
    {
        private readonly IAttributeService _attributeService = attributeService;
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] CreateAttributeDto createAttributeDto)
        {
            try
            {
                var createdAttribute = await _attributeService.CreateAttribute(createAttributeDto);
                return CreatedAtAction(nameof(Get), new { id = createdAttribute.Id }, createdAttribute);
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
                var attributes = await _attributeService.GetAllAttributes();
                return Ok(attributes);
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
                var attribute = await _attributeService.GetAttributeById(id);
                if (attribute == null) return NotFound(new { message = $"No entities found for project with ID {id}." });
                return Ok(attribute);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }


        [HttpPut("{id}")]
        public async Task<IActionResult> Put(long id, [FromBody] UpdateAttributeDto updateAttributeDto)
        {
            try
            {
                var updatedAttribute = await _attributeService.UpdateAttribute(id, updateAttributeDto);
                if (updatedAttribute == null) return NotFound(new { message = $"Attribute with ID {id} not found." });

                return Ok(updatedAttribute);
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
                await _attributeService.DeleteAttribute(id);
                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }

        }
    }
}
