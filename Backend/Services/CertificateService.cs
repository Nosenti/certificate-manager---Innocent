using Backend.Dtos;
using Backend.Repositories;

namespace Backend.Services
{
    public class CertificateService : ICertificateService
    {
        private readonly ICertificateRepository _certificateRepository;
        public CertificateService(ICertificateRepository certificateRepository)
        {
            _certificateRepository = certificateRepository;
        }

        public async Task<IEnumerable<CertificateDto>> GetAllCertificatesAsync()
        {
            return await _certificateRepository.GetAllCertificatesAsync();
        }
    }
}
