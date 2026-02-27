using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Dataset_Manager.Models
{
    [Table("Projects")]
    public class Project
    {
        [Key]
        public long Id { get; set; }

        [Required]
        [MaxLength(100)]
        public string Name { get; set; }

        [MaxLength(500)]
        public string? Description { get; set; }
        public List<EntityDefinition> Entities { get; set; } = new();
    }
}
