using Backend.Entities;

namespace Backend.Repositories
{
    public interface ISupplierRepository
    {
        Task<Supplier> GetSupplierByHandleAsync(Guid handle);
    }
}
