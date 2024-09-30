using Backend.Dtos;

namespace Backend.Repositories
{
    public interface ISupplierRepository
    {
        Task<SupplierDto> GetSupplierByHandleAsync(Guid handle);
        Task<IEnumerable<SupplierDto>> SearchSuppliersAsync(string? name, string? index, string? city);
    }
}
