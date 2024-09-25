using Backend.Entities;

namespace Backend.Repositories
{
    public interface ICertificateRepository
    {
        Task<IEnumerable<Certificate>> GetAllCertificatesAsync();
    }
}
