using Backend.Entities;

namespace Backend.Services
{
    public interface ICertificateService
    {
        Task<IEnumerable<Certificate>> GetAllCertificatesAsync();
    }
}
