namespace Generator_Service.Dtos
{
    public class ProjectDto
    {
        public long Id { get; set; }
        public required string Name { get; set; }
        public string? Description { get; set; }
        public List<EntityDto> Entities { get; set; } = new();
    }
}
