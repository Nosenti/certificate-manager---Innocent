using Backend.Dtos;

namespace Backend.Repositories
{
    public interface IUserRepository
    {
        Task<UserDto> GetUserByHandleAsync(Guid handle);
    }
}
