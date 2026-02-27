namespace Generator_Service.Dtos
{
    public class EntityDto
    {
        public long Id { get; set; }
        public required string Name { get; set; }
        public List<AttributeDto> Attributes { get; set; } = [];
        public List<EntityDto> SubEntities { get; set; } = [];
    }
}
