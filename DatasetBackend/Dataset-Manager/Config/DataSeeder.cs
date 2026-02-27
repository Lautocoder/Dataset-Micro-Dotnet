
using Dataset_Manager.Context;
using Dataset_Manager.Enums;
using Dataset_Manager.Models;
using Dataset_Manager.Repositories;
using Microsoft.EntityFrameworkCore;

namespace Dataset_Manager.Config
{
    public static class DataSeeder
    {
        private record AttrSpec(String Name, AttributeType Type, String? Constraints);

        public static async Task SeedAsync(IServiceProvider services)
        {
            using var scope = services.CreateScope();

            var db = scope.ServiceProvider.GetRequiredService<DataContext>();
            await db.Database.MigrateAsync();

            var projectRepo = scope.ServiceProvider.GetRequiredService<IRepository<Project>>();
            var entityRepo = scope.ServiceProvider.GetRequiredService<IRepository<EntityDefinition>>();
            var attrRepo = scope.ServiceProvider.GetRequiredService<IRepository<AttributeDefinition>>();

            // IMPORTANT: évite de “skip” si un seed partiel existe
            // => tu peux changer le critère (ex: >= 3 projets)
            var existingProjects = await projectRepo.CountAsync();
            if (existingProjects > 0) return;

            // Helper: créer Entity + attacher attributes (via FK EntityId plus tard)
            async Task<EntityDefinition> CreateEntityAsync(String name, Project project, EntityDefinition? parent = null)
            {
                var e = new EntityDefinition
                {
                    Name = name,
                    ProjectId = project.Id,
                    ParentEntityId = parent?.Id
                };

                await entityRepo.CreateAsync(e);
                await entityRepo.SaveAsync(); // pour obtenir e.Id
                return e;
            }

            async Task AddAttrsAsync(EntityDefinition entity, params AttrSpec[] specs)
            {
                var attrs = specs.Select(s => new AttributeDefinition
                {
                    Name = s.Name,
                    Type = s.Type,
                    Constraints = s.Constraints,
                    EntityId = entity.Id
                }).ToList();

                await attrRepo.AddRangeAsync(attrs);
                await attrRepo.SaveAsync();
            }

            // -------------------------
            // 1) Projet: E-commerce
            // -------------------------
            var ecommerce = new Project
            {
                Name = "E-commerce Store",
                Description = "Dataset réaliste pour une boutique en ligne (clients, produits, commandes)"
            };
            await projectRepo.CreateAsync(ecommerce);
            await projectRepo.SaveAsync();

            var user = await CreateEntityAsync("User", ecommerce);
            await AddAttrsAsync(user,
                new AttrSpec("email", AttributeType.STRING, "NOT_NULL;UNIQUE"),
                new AttrSpec("fullName", AttributeType.STRING, "NOT_NULL"),
                new AttrSpec("age", AttributeType.INTEGER, "MIN=13;MAX=120")
            );

            var address = await CreateEntityAsync("Address", ecommerce, parent: user);
            await AddAttrsAsync(address,
                new AttrSpec("street", AttributeType.STRING, "NOT_NULL"),
                new AttrSpec("city", AttributeType.STRING, "NOT_NULL"),
                new AttrSpec("zipCode", AttributeType.STRING, "REGEX=^[0-9]{5}$")
            );

            var product = await CreateEntityAsync("Product", ecommerce);
            await AddAttrsAsync(product,
                new AttrSpec("sku", AttributeType.STRING, "NOT_NULL;UNIQUE"),
                new AttrSpec("name", AttributeType.STRING, "NOT_NULL"),
                new AttrSpec("price", AttributeType.FLOAT, "MIN=0.01")
            );

            var order = await CreateEntityAsync("Order", ecommerce);
            await AddAttrsAsync(order,
                new AttrSpec("orderNumber", AttributeType.STRING, "NOT_NULL;UNIQUE"),
                new AttrSpec("orderDate", AttributeType.DATE, "NOT_NULL"),
                new AttrSpec("status", AttributeType.STRING, "VALUES=PENDING,PAID,SHIPPED,CANCELLED")
            );

            var orderItem = await CreateEntityAsync("OrderItem", ecommerce, parent: order);
            await AddAttrsAsync(orderItem,
                new AttrSpec("quantity", AttributeType.INTEGER, "MIN=1"),
                new AttrSpec("unitPrice", AttributeType.FLOAT, "MIN=0.01"),
                new AttrSpec("productSku", AttributeType.STRING, "NOT_NULL")
            );

            // -------------------------
            // 2) Projet: Population / Recensement
            // -------------------------
            var census = new Project
            {
                Name = "Population Census",
                Description = "Dataset de recensement (personnes, ménages, localisations)"
            };
            await projectRepo.CreateAsync(census);
            await projectRepo.SaveAsync();

            var person = await CreateEntityAsync("Person", census);
            await AddAttrsAsync(person,
                new AttrSpec("nationalId", AttributeType.STRING, "NOT_NULL;UNIQUE"),
                new AttrSpec("birthDate", AttributeType.DATE, "NOT_NULL"),
                new AttrSpec("gender", AttributeType.STRING, "VALUES=F,M,OTHER")
            );

            var household = await CreateEntityAsync("Household", census);
            await AddAttrsAsync(household,
                new AttrSpec("householdCode", AttributeType.STRING, "NOT_NULL;UNIQUE"),
                new AttrSpec("membersCount", AttributeType.INTEGER, "MIN=1;MAX=20"),
                new AttrSpec("incomeMonthly", AttributeType.FLOAT, "MIN=0")
            );

            var city = await CreateEntityAsync("City", census);
            await AddAttrsAsync(city,
                new AttrSpec("name", AttributeType.STRING, "NOT_NULL"),
                new AttrSpec("country", AttributeType.STRING, "NOT_NULL"),
                new AttrSpec("population", AttributeType.INTEGER, "MIN=0")
            );

            var employment = await CreateEntityAsync("Employment", census);
            await AddAttrsAsync(employment,
                new AttrSpec("company", AttributeType.STRING, ""),
                new AttrSpec("jobTitle", AttributeType.STRING, ""),
                new AttrSpec("salary", AttributeType.FLOAT, "MIN=0")
            );

            var education = await CreateEntityAsync("Education", census);
            await AddAttrsAsync(education,
                new AttrSpec("level", AttributeType.STRING, "VALUES=PRIMARY,SECONDARY,BACHELOR,MASTER,PHD"),
                new AttrSpec("field", AttributeType.STRING, ""),
                new AttrSpec("graduationYear", AttributeType.INTEGER, "MIN=1950;MAX=2030")
            );

            // -------------------------
            // 3) Projet: IoT / Capteurs
            // -------------------------
            var iot = new Project
            {
                Name = "IoT Sensors",
                Description = "Dataset capteurs IoT (devices, mesures, alertes)"
            };
            await projectRepo.CreateAsync(iot);
            await projectRepo.SaveAsync();

            var device = await CreateEntityAsync("Device", iot);
            await AddAttrsAsync(device,
                new AttrSpec("deviceId", AttributeType.STRING, "NOT_NULL;UNIQUE"),
                new AttrSpec("model", AttributeType.STRING, "NOT_NULL"),
                new AttrSpec("isActive", AttributeType.BOOLEAN, "DEFAULT=true")
            );

            var reading = await CreateEntityAsync("SensorReading", iot);
            await AddAttrsAsync(reading,
                new AttrSpec("timestamp", AttributeType.DATE, "NOT_NULL"),
                new AttrSpec("temperature", AttributeType.FLOAT, "MIN=-50;MAX=120"),
                new AttrSpec("humidity", AttributeType.FLOAT, "MIN=0;MAX=100")
            );

            var location = await CreateEntityAsync("Location", iot);
            await AddAttrsAsync(location,
                new AttrSpec("latitude", AttributeType.FLOAT, "MIN=-90;MAX=90"),
                new AttrSpec("longitude", AttributeType.FLOAT, "MIN=-180;MAX=180"),
                new AttrSpec("label", AttributeType.STRING, "")
            );

            var alert = await CreateEntityAsync("Alert", iot);
            await AddAttrsAsync(alert,
                new AttrSpec("type", AttributeType.STRING, "VALUES=OVERHEAT,LOW_BATTERY,DISCONNECTED"),
                new AttrSpec("severity", AttributeType.STRING, "VALUES=LOW,MEDIUM,HIGH"),
                new AttrSpec("createdAt", AttributeType.DATE, "NOT_NULL")
            );

            var maintenance = await CreateEntityAsync("MaintenanceTicket", iot);
            await AddAttrsAsync(maintenance,
                new AttrSpec("ticketNumber", AttributeType.STRING, "NOT_NULL;UNIQUE"),
                new AttrSpec("openedAt", AttributeType.DATE, "NOT_NULL"),
                new AttrSpec("resolved", AttributeType.BOOLEAN, "DEFAULT=false")
            );
        }
    }
}
