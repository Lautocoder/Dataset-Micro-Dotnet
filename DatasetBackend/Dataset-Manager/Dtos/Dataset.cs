namespace Dataset_Manager.Dtos
{
    public class Dataset
    {
        public string ProjectName { get; set; }
        public int Count { get; set; }
        public string? Status { get; set; }
        public Dictionary<string, List<Dictionary<string, object>>> Data { get; set; }

        public Dataset(string projectName, int count,
        Dictionary<string, List<Dictionary<string, object>>> data)
        {
            ProjectName = projectName;
            Count = count;
            Data = data;
        }
    }
}
