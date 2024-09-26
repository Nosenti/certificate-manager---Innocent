using Backend.Data;
using Backend.Dtos;
using Backend.Mappers;
using Microsoft.EntityFrameworkCore;

namespace Backend.Repositories
{
    public class CertificateRepository : ICertificateRepository
    {
        private readonly CertificatesDbContext _context;

        public CertificateRepository(CertificatesDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<CertificateDto>> GetAllCertificatesAsync()
        {
            var certificates = await _context.Certificates.Include(c => c.CertificateParticipants).ToListAsync();
            return certificates.ToDtoList();
        }
    }
}
