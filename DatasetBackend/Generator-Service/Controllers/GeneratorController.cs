using Generator_Service.Dtos;
using Generator_Service.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Generator_Service.Controllers
{
    [Route("api/generate")]
    [ApiController]
    public class GeneratorController(IDatasetGeneratorService datasetGeneratorService) : ControllerBase
    {
        private readonly IDatasetGeneratorService _datasetGeneratorService = datasetGeneratorService;

        [HttpPost]
        public IActionResult Generate([FromBody] ProjectDto project, [FromQuery] int count = 10)
        {
            if (count <= 0)
                return BadRequest("Count must be a positive integer.");
            var dataset = _datasetGeneratorService.Generate(project, count);
            return Ok(dataset);
        }
    }
}
