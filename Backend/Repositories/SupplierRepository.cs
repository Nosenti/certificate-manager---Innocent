using Backend.Data;
using Backend.Entities;
using Microsoft.EntityFrameworkCore;

namespace Backend.Repositories
{
    public class SupplierRepository : ISupplierRepository
    {
        private readonly CertificatesDbContext _context;

        public SupplierRepository(CertificatesDbContext context)
        {
            _context = context;
        }
        public async Task<Supplier> GetSupplierByHandleAsync(Guid handle)
        {
            var supplier = await _context.Suppliers.FirstOrDefaultAsync(c => c.Handle == handle);

            if (supplier == null) return null;

            return supplier;
        }
    }
}
