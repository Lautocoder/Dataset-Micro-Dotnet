using Dataset_Manager.Dtos;

namespace Dataset_Manager.Services
{
    public interface IAttributeService
    {
        Task<List<AttributeDto>> GetAllAttributes();
        Task<List<AttributeDto>?> GetAttributesByEntityId(long id);
        Task<AttributeDto?> GetAttributeById(long id);
        Task<AttributeDto> CreateAttribute(CreateAttributeDto createAttributeDto);
        Task<AttributeDto?> UpdateAttribute(long id, UpdateAttributeDto updateAttributeDto);
        Task DeleteAttribute(long id);
    }
}
