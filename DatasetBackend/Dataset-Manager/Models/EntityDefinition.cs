using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Dataset_Manager.Models
{
    [Table("Entities")]
    public class EntityDefinition
    {
        [Key]
        public long Id { get; set; }

        [Required]
        [MaxLength(100)]
        public string Name { get; set; } = default!;

        public long ProjectId { get; set; }

        [JsonIgnore] 
        public Project Project { get; set; } = default!;
        public List<AttributeDefinition> Attributes { get; set; } = new();

        public long? ParentEntityId { get; set; }
        public EntityDefinition? ParentEntity { get; set; }

        public List<EntityDefinition> SubEntities { get; set; } = new();
    }
}