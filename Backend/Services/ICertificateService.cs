using Backend.Dtos;

namespace Backend.Services
{
    public interface ICertificateService
    {
        Task<IEnumerable<CertificateDto>> GetAllCertificatesAsync();
    }
}
