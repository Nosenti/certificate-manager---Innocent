using Backend.Dtos;

namespace Backend.Repositories
{
    public interface IUserRepository
    {
        Task<IEnumerable<UserDto>> GetAllUsersAsync();
        Task<UserDto> GetUserByHandleAsync(Guid handle);
    }
}
