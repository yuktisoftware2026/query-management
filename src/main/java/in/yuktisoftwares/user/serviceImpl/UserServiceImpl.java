package in.yuktisoftwares.user.serviceImpl;

import in.yuktisoftwares.exception.ResourceNotFoundException;
import in.yuktisoftwares.user.dto.UserRequestDTO;
import in.yuktisoftwares.user.dto.UserResponseDTO;
import in.yuktisoftwares.user.entity.UserEntity;
import in.yuktisoftwares.user.entity.UserStatus;
import in.yuktisoftwares.user.repository.UserRepository;
import in.yuktisoftwares.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository repository;

    @Override
    public UserResponseDTO createUser(UserRequestDTO request) {

        UserEntity user = UserEntity.builder()
                .name(request.getName())
                .email(request.getEmail())
                .phone(request.getPhone())
                .password(request.getPassword())
                .role(request.getRole())
                .status(UserStatus.ACTIVE)
                .build();

        return map(repository.save(user));
    }

    @Override
    public UserResponseDTO getUserById(Long id) {

        UserEntity user =
                repository.findById(id)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "User not found"));

        return map(user);
    }

    @Override
    public List<UserResponseDTO> getAllUsers() {

        return repository.findAll()
                .stream()
                .map(this::map)
                .toList();
    }

    @Override
    public UserResponseDTO updateUser(Long id,
                                      UserRequestDTO request) {

        UserEntity user =
                repository.findById(id)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "User not found"));

        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPhone(request.getPhone());
        user.setPassword(request.getPassword());
        user.setRole(request.getRole());

        return map(repository.save(user));
    }

    @Override
    public void deactivateUser(Long id) {

        UserEntity user =
                repository.findById(id)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "User not found"));

        user.setStatus(UserStatus.INACTIVE);

        repository.save(user);
    }

    private UserResponseDTO map(UserEntity user) {

        return UserResponseDTO.builder()
                .id(user.getId())
                .name(user.getName())
                .email(user.getEmail())
                .phone(user.getPhone())
                .role(user.getRole())
                .status(user.getStatus())
                .build();
    }
}