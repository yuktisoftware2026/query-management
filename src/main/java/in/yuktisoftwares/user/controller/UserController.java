package in.yuktisoftwares.user.controller;

import in.yuktisoftwares.user.dto.UserRequestDTO;
import in.yuktisoftwares.user.dto.UserResponseDTO;
import in.yuktisoftwares.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService service;

    @PostMapping
    public UserResponseDTO createUser(@RequestBody UserRequestDTO request) {
        return service.createUser(request);
    }

    @GetMapping("/{id}")
    public UserResponseDTO getUser(@PathVariable Long id) {
        return service.getUserById(id);
    }

    @GetMapping
    public List<UserResponseDTO> getAllUsers() {
        return service.getAllUsers();
    }

    @PutMapping("/{id}")
    public UserResponseDTO updateUser(
            @PathVariable Long id,
            @RequestBody UserRequestDTO request) {

        return service.updateUser(id, request);
    }

    @DeleteMapping("/{id}")
    public void deactivateUser(@PathVariable Long id) {
        service.deactivateUser(id);
    }
}