package in.yuktisoftwares.user.service;

import in.yuktisoftwares.user.dto.UserRequestDTO;
import in.yuktisoftwares.user.dto.UserResponseDTO;

import java.util.List;

public interface UserService {

    UserResponseDTO createUser(UserRequestDTO request);

    UserResponseDTO getUserById(Long id);

    List<UserResponseDTO> getAllUsers();

    UserResponseDTO updateUser(Long id, UserRequestDTO request);

    void deactivateUser(Long id);
}