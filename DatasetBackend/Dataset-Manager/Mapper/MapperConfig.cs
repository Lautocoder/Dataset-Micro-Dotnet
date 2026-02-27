using AutoMapper;
using Dataset_Manager.Dtos;
using Dataset_Manager.Models;

namespace Dataset_Manager.Mapper
{
    public class MapperConfig : Profile
    {
        public MapperConfig()
        {
            CreateMap<Project, ProjectDto>().ReverseMap();
            CreateMap<CreateProjectDto, Project>();
            CreateMap<UpdateProjectDto, Project>();


            CreateMap<EntityDefinition, EntityDto>().ReverseMap();
            CreateMap<CreateEntityDto, EntityDefinition>();
            CreateMap<UpdateEntityDto, EntityDefinition>();

            CreateMap<AttributeDefinition, AttributeDto>().ReverseMap();
            CreateMap<CreateAttributeDto, AttributeDefinition>();
            CreateMap<UpdateAttributeDto, AttributeDefinition>();

        }
    }
}
