package in.yuktisoftwares.user.dto;

import in.yuktisoftwares.user.entity.Role;
import in.yuktisoftwares.user.entity.UserStatus;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class UserResponseDTO {

    private Long id;

    private String name;

    private String email;

    private String phone;

    private Role role;

    private UserStatus status;
}