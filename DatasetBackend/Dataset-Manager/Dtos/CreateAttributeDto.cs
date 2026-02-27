using Dataset_Manager.Enums;

namespace Dataset_Manager.Dtos
{
    public class CreateAttributeDto
    {
        public string Name { get; set; }
        public AttributeType Type { get; set; }
        public string? Constraints { get; set; }
    }
}
