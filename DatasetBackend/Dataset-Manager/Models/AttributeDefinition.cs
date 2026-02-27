using Dataset_Manager.Enums;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Dataset_Manager.Models
{
    [Table("Attributes")]
    public class AttributeDefinition
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public long Id { get; set; }

        [Required]
        [MaxLength(100)]
        public string Name { get; set; } = default!;

        [Required]
        [MaxLength(50)] // utile seulement si tu stockes en string
        public AttributeType Type { get; set; }

        [MaxLength(100)]
        public string? Constraints { get; set; }
        [Required]
        public long EntityId { get; set; }

        [JsonIgnore]
        public EntityDefinition Entity { get; set; } = default!;
    }
}