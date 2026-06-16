package in.yuktisoftwares.user.dto;

import in.yuktisoftwares.user.entity.Role;
import lombok.Data;

@Data
public class UserRequestDTO {

    private String name;

    private String email;

    private String phone;

    private String password;

    private Role role;
}