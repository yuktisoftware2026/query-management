package in.yuktisoftwares.assignment.controller;

import in.yuktisoftwares.assignment.dto.AssignmentRequestDTO;
import in.yuktisoftwares.assignment.dto.AssignmentResponseDTO;
import in.yuktisoftwares.assignment.service.AssignmentService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/assignments")
@RequiredArgsConstructor
public class AssignmentController {

    private final AssignmentService service;

    @PostMapping
    public AssignmentResponseDTO createAssignment(
            @RequestBody AssignmentRequestDTO request) {

        return service.createAssignment(request);
    }

    @GetMapping("/{id}")
    public AssignmentResponseDTO getAssignment(
            @PathVariable Long id) {

        return service.getAssignmentById(id);
    }

    @GetMapping
    public List<AssignmentResponseDTO> getAllAssignments() {

        return service.getAllAssignments();
    }

    @PutMapping("/{id}")
    public AssignmentResponseDTO updateAssignment(
            @PathVariable Long id,
            @RequestBody AssignmentRequestDTO request) {

        return service.updateAssignment(id, request);
    }

    @DeleteMapping("/{id}")
    public String deactivateAssignment(
            @PathVariable Long id) {

        service.deactivateAssignment(id);

        return "Assignment deactivated successfully";
    }
}