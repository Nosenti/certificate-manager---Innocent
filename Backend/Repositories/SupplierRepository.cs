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
        public async Task<IEnumerable<Supplier>> SearchSuppliersAsync(string? name, string? index, string? city)
        {
            var query = _context.Suppliers.AsQueryable();

            if (!string.IsNullOrWhiteSpace(name))
            {
                query = query.Where(s => s.Name.Contains(name));
            }

            if (!string.IsNullOrWhiteSpace(index))
            {
                query = query.Where(s => s.Index.Contains(index));
            }

            if (!string.IsNullOrWhiteSpace(city))
            {
                query = query.Where(s => s.City.Contains(city));
            }

            return await query.ToListAsync();
        }
    }
}
