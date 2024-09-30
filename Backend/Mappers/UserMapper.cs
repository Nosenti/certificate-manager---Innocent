using Backend.Dtos;
using Backend.Entities;

namespace Backend.Mappers
{
    public static class UserMapper
    {
        public static UserDto ToDto(this User user)
        {
            return new UserDto
            {
                Handle = user.Handle,
                Name = user.Name,
                Email = user.Email
            };
        }

        public static List<UserDto> ToDtoList(this IEnumerable<User> users)
        {
            return users.Select(user => user.ToDto()).ToList();
        }
    }
}
