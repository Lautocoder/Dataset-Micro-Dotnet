using Dataset_Manager.Dtos;

namespace Dataset_Manager.Services
{
    public interface IEntityService
    {
        Task<List<EntityDto>> GetAllEntities();
        Task<List<EntityDto>?> GetEntitiesByProjectId(long id);
        Task<List<EntityDto>?> GetEntitiesByParentEntity(long id);

        Task<EntityDto?> GetEntityById(long id);
        Task<EntityDto> CreateEntity(CreateEntityDto createEntityDto);
        Task<EntityDto?> UpdateEntity(long id, UpdateEntityDto updateEntityDto);
        Task DeleteEntity(long id);
    }
}
