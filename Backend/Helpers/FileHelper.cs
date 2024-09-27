namespace Backend.Helpers
{
    public static class FileHelper
    {
        public static async Task<byte[]?> ConvertToByteArrayAsync(IFormFile? formFile)
        {
            if (formFile == null)
            {
                return null;
            }

            using (var memoryStream = new MemoryStream())
            {
                await formFile.CopyToAsync(memoryStream);
                return memoryStream.ToArray();
            }
        }
    }
}
