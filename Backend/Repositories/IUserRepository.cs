using Backend.Entities;

namespace Backend.Repositories
{
    public interface IUserRepository
    {
        Task<User> GetUserByHandleAsync(Guid handle);
    }
}
