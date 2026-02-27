using Generator_Service.Enums;
using Generator_Service.Models;
using System.Globalization;
using Bogus;
using Generator_Service.Dtos;

namespace Generator_Service.Services.impl
{
    public class DatasetGeneratorService : IDatasetGeneratorService
    {
        private readonly Faker _faker = new Faker("fr");
        private readonly Random _random = new Random();

        public Dataset Generate(ProjectDto project, int count)
        {
            var data = new Dictionary<string, List<Dictionary<string, object?>>>();

            var roots = FindRootEntities(project.Entities);

            foreach (var root in roots)
            {
                var rows = new List<Dictionary<string, object?>>();
                for (int i = 0; i < count; i++)
                {
                    rows.Add(GenerateRow(root));
                }

                data[root.Name] = rows;
            }

            return new Dataset(project.Name, count, data);
        }

        private Dictionary<string, object?> GenerateRow(EntityDto entity)
        {
            var row = new Dictionary<string, object?>();

            // attributs simples
            foreach (var attr in Safe(entity.Attributes))
            {
                row[attr.Name] = FakeValue(attr);
            }

            // sous-entités imbriquées (récursif)
            foreach (var sub in Safe(entity.SubEntities))
            {
                int subCount = RandomBetween(1, 3);

                var subRows = new List<Dictionary<string, object?>>();
                for (int i = 0; i < subCount; i++)
                {
                    subRows.Add(GenerateRow(sub)); // recursion
                }

                row[sub.Name] = subRows;
            }

            return row;
        }

        private List<EntityDto> FindRootEntities(List<EntityDto>? entities)
        {
            if (entities == null || entities.Count == 0) return new List<EntityDto>();

            var subEntityIds = new HashSet<long>();

            foreach (var e in entities)
            {
                foreach (var sub in Safe(e.SubEntities))
                {
                    if (sub.Id >0) subEntityIds.Add(sub.Id);
                }
            }

            var roots = new List<EntityDto>();
            foreach (var e in entities)
            {
                var id = e.Id;
                if (!subEntityIds.Contains(id))
                {
                    roots.Add(e);
                }
            }

            return roots;
        }

        private static IEnumerable<T> Safe<T>(IEnumerable<T>? list) => list ?? Enumerable.Empty<T>();

        private int RandomBetween(int minInclusive, int maxInclusive)
            => _random.Next(minInclusive, maxInclusive + 1);

        private object? FakeValue(AttributeDto attr)
        {
            var name = (attr.Name ?? "").ToLowerInvariant();
            var type = attr.Type;

            // 1) Heuristiques basées sur le NOM
            if (type == AttributeType.STRING)
            {
                if (name.Contains("email")) return _faker.Internet.Email();
                if (name.Contains("fullname") || (name.Contains("full") && name.Contains("name")))
                    return _faker.Name.FullName();

                if (name == "name") return _faker.Commerce.ProductName();

                if (name.Contains("first") && name.Contains("name")) return _faker.Name.FirstName();
                if (name.Contains("last") && name.Contains("name")) return _faker.Name.LastName();

                if (name.Contains("city")) return _faker.Address.City();
                if (name.Contains("country")) return _faker.Address.Country();
                if (name.Contains("street")) return _faker.Address.StreetAddress();
                if (name.Contains("zipcode") || name.Contains("zip"))
                {
                    var zip = _faker.Address.ZipCode();
                    var digits = new string(zip.Where(char.IsDigit).ToArray());
                    return digits.Length >= 5 ? digits.Substring(0, 5) : digits;
                }

                if (name.Contains("sku")) return _faker.Commerce.Ean13();
                if (name.Contains("ordernumber") || name.Contains("order_number"))
                    return "ORD-" + _faker.Random.Digits(8).Aggregate("", (s, d) => s + d);

                if (name.Contains("status")) return RandomFrom("PENDING", "PAID", "SHIPPED", "CANCELLED");

                if (name.Contains("gender")) return RandomFrom("F", "M", "OTHER");
                if (name.Contains("jobtitle")) return _faker.Name.JobTitle();
                if (name.Contains("company")) return _faker.Company.CompanyName();
                if (name.Contains("field")) return _faker.Lorem.Word();
                if (name.Contains("level")) return RandomFrom("PRIMARY", "SECONDARY", "BACHELOR", "MASTER", "PHD");

                if (name.Contains("ticketnumber")) return "TCK-" + _faker.Random.Digits(8).Aggregate("", (s, d) => s + d);
                if (name.Contains("type")) return RandomFrom("OVERHEAT", "LOW_BATTERY", "DISCONNECTED");
                if (name.Contains("severity")) return RandomFrom("LOW", "MEDIUM", "HIGH");

                if (name.Contains("nationalid") || name.Contains("national_id"))
                    return _faker.Random.ReplaceNumbers("###########");

                // fallback
                return _faker.Random.AlphaNumeric(_random.Next(8, 15));
            }

            // 2) Par TYPE
            return type switch
            {
                AttributeType.INTEGER => FakeIntegerFor(name),
                AttributeType.FLOAT => FakeFloatFor(name),
                AttributeType.BOOLEAN => _faker.Random.Bool(),
                AttributeType.DATE => FakeDateFor(name),
                _ => null
            };
        }

        private int FakeIntegerFor(string name)
        {
            if (name.Contains("age")) return _faker.Random.Int(13, 120);
            if (name.Contains("quantity")) return _faker.Random.Int(1, 10);
            if (name.Contains("memberscount") || name.Contains("members_count")) return _faker.Random.Int(1, 20);
            if (name.Contains("population")) return _faker.Random.Int(0, 5_000_000);
            if (name.Contains("graduationyear") || name.Contains("graduation_year")) return _faker.Random.Int(1950, 2026);
            return _faker.Random.Int(0, 100);
        }

        private double FakeFloatFor(string name)
        {
            double v;
            if (name.Contains("price") || name.Contains("unitprice")) v = _faker.Random.Double(1, 500);
            else if (name.Contains("temperature")) v = _faker.Random.Double(-50, 120);
            else if (name.Contains("humidity")) v = _faker.Random.Double(0, 100);
            else if (name.Contains("income")) v = _faker.Random.Double(0, 20_000);
            else if (name.Contains("salary")) v = _faker.Random.Double(0, 30_000);
            else if (name.Contains("latitude")) return Round(_faker.Random.Double(-90, 90), 6);
            else if (name.Contains("longitude")) return Round(_faker.Random.Double(-180, 180), 6);
            else v = _faker.Random.Double(0, 10_000);

            return Round(v, 2);
        }

        private string FakeDateFor(string name)
        {
            DateTime date;
            if (name.Contains("birth"))
            {
                date = DateTime.Today
                    .AddYears(-_faker.Random.Int(0, 90))
                    .AddDays(-_faker.Random.Int(0, 365));
            }
            else
            {
                date = DateTime.Today.AddDays(-_faker.Random.Int(0, 365));
            }

            return date.ToString("yyyy-MM-dd", CultureInfo.InvariantCulture);
        }

        private string RandomFrom(params string[] values)
            => values[_random.Next(values.Length)];

        private static double Round(double v, int digits) => Math.Round(v, digits);
    }
}
