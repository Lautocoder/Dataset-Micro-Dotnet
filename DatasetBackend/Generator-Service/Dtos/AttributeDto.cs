using Generator_Service.Enums;

namespace Generator_Service.Dtos
{
    public class AttributeDto
    {
        public long Id { get; set; }
        public required string Name { get; set; }
        public AttributeType Type { get; set; }
        public string? Constraints { get; set; }
    }
}
