using Backend.Entities;

namespace Backend.Repositories
{
    public interface ISupplierRepository
    {
        Task<Supplier> GetSupplierByHandleAsync(Guid handle);
        Task<IEnumerable<Supplier>> SearchSuppliersAsync(string? name, string? index, string? city);
    }
}
