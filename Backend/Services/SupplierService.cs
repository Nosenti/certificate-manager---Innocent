using Backend.Dtos;
using Backend.Mappers;
using Backend.Repositories;

namespace Backend.Services
{
    public class SupplierService : ISupplierService
    {
        private readonly ISupplierRepository _supplierRepository;

        public SupplierService(ISupplierRepository supplierRepository)
        {
            _supplierRepository = supplierRepository;
        }

        public async Task<IEnumerable<SupplierDto>> SearchSuppliersAsync(string? name, string? index, string? city)
        {
            var suppliers = await _supplierRepository.SearchSuppliersAsync(name, index, city);
            return suppliers.ToDtoList();
        }
    }
}
