using Backend.Data;
using Backend.Entities;
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

        public async Task<IEnumerable<Certificate>> GetAllCertificatesAsync()
        {
            return await _context.Certificates.Include(c => c.CertificateParticipants).ToListAsync();
        }
    }
}
