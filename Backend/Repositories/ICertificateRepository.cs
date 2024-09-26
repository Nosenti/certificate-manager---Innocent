using Backend.Dtos;

namespace Backend.Repositories
{
    public interface ICertificateRepository
    {
        Task<IEnumerable<CertificateDto>> GetAllCertificatesAsync();
    }
}
