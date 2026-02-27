using AutoMapper;
using Dataset_Manager.Dtos;
using Dataset_Manager.Models;
using Dataset_Manager.Repositories;

namespace Dataset_Manager.Services.impl
{
    public class EntityService(IRepository<EntityDefinition> entityRepository, IMapper mapper) : IEntityService
    {
        private readonly IRepository<EntityDefinition> _entityRepository = entityRepository;
        private readonly IMapper _mapper = mapper;

        public async Task<EntityDto> CreateEntity(CreateEntityDto createEntityDto)
        {
            try
            {
                var entity = _mapper.Map<EntityDefinition>(createEntityDto);
                var createdEntity = await _entityRepository.CreateAsync(entity);
                await _entityRepository.SaveAsync();

                return _mapper.Map<EntityDto>(createdEntity);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<List<EntityDto>> GetAllEntities()
        {
            try
            {
                var entities = await _entityRepository.GetAllAsync(includeProperties: "Attributes");
                return _mapper.Map<List<EntityDto>>(entities);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<List<EntityDto>?> GetEntitiesByParentEntity(long id)
        {
            try
            {
                var entities = await _entityRepository.GetAllAsync(e => e.ParentEntityId == id,includeProperties: "Attributes");
                if (entities == null) return null;

                return _mapper.Map<List<EntityDto>>(entities);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<List<EntityDto>?> GetEntitiesByProjectId(long id)
        {
            try
            {
                var entities = await _entityRepository.GetAllAsync(e => e.ProjectId == id, includeProperties: "Attributes");
                if (entities == null) return null;

                return _mapper.Map<List<EntityDto>>(entities);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<EntityDto?> GetEntityById(long id)
        {
            try
            {
                var entity = await _entityRepository.GetAsync(e => e.Id == id, includeProperties: "Attributes");
                if (entity == null) return null;

                return _mapper.Map<EntityDto>(entity);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<EntityDto?> UpdateEntity(long id, UpdateEntityDto updateEntityDto)
        {
            try
            {
                var existingEntity = await _entityRepository.GetAsync(e => e.Id == id);
                if (existingEntity == null) return null;

                var entity = _mapper.Map(updateEntityDto, existingEntity);
                var updatedEntity = _entityRepository.Update(entity);
                await _entityRepository.SaveAsync();

                return _mapper.Map<EntityDto>(updatedEntity);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task DeleteEntity(long id)
        {
            try
            {
                var entity = await _entityRepository.GetAsync(e => e.Id == id);
                if (entity == null) return;

                _entityRepository.Remove(entity);
                await _entityRepository.SaveAsync();
            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}
