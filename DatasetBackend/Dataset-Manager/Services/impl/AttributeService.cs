using AutoMapper;
using Dataset_Manager.Dtos;
using Dataset_Manager.Models;
using Dataset_Manager.Repositories;

namespace Dataset_Manager.Services.impl
{
    public class AttributeService(IRepository<AttributeDefinition> attributeRepository, IMapper mapper) : IAttributeService
    {
        private readonly IRepository<AttributeDefinition> _attributeRepository = attributeRepository;
        private readonly IMapper _mapper = mapper;
        public async Task<AttributeDto> CreateAttribute(CreateAttributeDto createAttributeDto)
        {
            try
            {
                var attribute = _mapper.Map<AttributeDefinition>(createAttributeDto);
                var createdAttribute = await _attributeRepository.CreateAsync(attribute);
                await _attributeRepository.SaveAsync();

                return _mapper.Map<AttributeDto>(createdAttribute);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task DeleteAttribute(long id)
        {
            try
            {
                var attribute = await _attributeRepository.GetAsync(a => a.Id == id);
                if (attribute == null)
                {
                    throw new Exception($"Project with id {id} not found.");
                }
                _attributeRepository.Remove(attribute);
                await _attributeRepository.SaveAsync();
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<List<AttributeDto>> GetAllAttributes()
        {
            try
            {
                var attributes = await _attributeRepository.GetAllAsync();
                return _mapper.Map<List<AttributeDto>>(attributes);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<AttributeDto?> GetAttributeById(long id)
        {
            try
            {
                var entity = await _attributeRepository.GetAsync(p => p.Id == id);
                if (entity == null)
                {
                    return null;
                }
                return _mapper.Map<AttributeDto>(entity);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<List<AttributeDto>?> GetAttributesByEntityId(long id)
        {
            try
            {
                var attributes = await _attributeRepository.GetAllAsync(a=> a.EntityId==id);
                if (attributes == null) return null;

                return _mapper.Map<List<AttributeDto>>(attributes);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<AttributeDto?> UpdateAttribute(long id, UpdateAttributeDto updateAttributeDto)
        {
            try
            {
                var attribute = _attributeRepository.GetAsync(a => a.Id == id).Result;
                if (attribute == null) return null;

                _mapper.Map(updateAttributeDto, attribute);
                var updatedAttribute = _attributeRepository.Update(attribute);
                await _attributeRepository.SaveAsync();

                return _mapper.Map<AttributeDto>(updatedAttribute);
            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}
