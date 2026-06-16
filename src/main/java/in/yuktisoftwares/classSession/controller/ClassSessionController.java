package in.yuktisoftwares.classSession.controller;

import in.yuktisoftwares.classSession.dto.ClassSessionRequestDTO;
import in.yuktisoftwares.classSession.dto.ClassSessionResponseDTO;
import in.yuktisoftwares.classSession.service.ClassSessionService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/sessions")
@RequiredArgsConstructor
public class ClassSessionController {

    private final ClassSessionService service;

    @PostMapping
    public ClassSessionResponseDTO createSession(
            @RequestBody ClassSessionRequestDTO request) {

        return service.createSession(request);
    }

    @GetMapping("/{id}")
    public ClassSessionResponseDTO getSession(
            @PathVariable Long id) {

        return service.getSessionById(id);
    }

    @GetMapping
    public List<ClassSessionResponseDTO> getAllSessions() {

        return service.getAllSessions();
    }

    @PutMapping("/{id}")
    public ClassSessionResponseDTO updateSession(
            @PathVariable Long id,
            @RequestBody ClassSessionRequestDTO request) {

        return service.updateSession(id, request);
    }

    @DeleteMapping("/{id}")
    public String deleteSession(
            @PathVariable Long id) {

        service.deleteSession(id);

        return "Session deleted successfully";
    }
}