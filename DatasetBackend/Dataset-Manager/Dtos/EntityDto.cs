namespace Dataset_Manager.Dtos
{
    public class EntityDto
    {
        public long Id { get; set; }
        public required string Name { get; set; }
        public List<AttributeDto> Attributes { get; set; } = [new()];
        public List<EntityDto> SubEntities { get; set; } = [];
    }
}
