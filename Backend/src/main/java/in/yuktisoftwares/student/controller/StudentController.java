package in.yuktisoftwares.student.controller;

import in.yuktisoftwares.student.dto.StudentRequestDTO;
import in.yuktisoftwares.student.dto.StudentResponseDTO;
import in.yuktisoftwares.student.service.StudentService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/students")
@RequiredArgsConstructor
public class StudentController {

    private final StudentService service;

    @PostMapping
    public StudentResponseDTO createStudent(
            @RequestBody StudentRequestDTO request) {

        return service.createStudent(request);
    }

    @GetMapping("/{id}")
    public StudentResponseDTO getStudent(
            @PathVariable Long id) {

        return service.getStudentById(id);
    }

    @GetMapping
    public List<StudentResponseDTO> getAllStudents() {

        return service.getAllStudents();
    }

    @PutMapping("/{id}")
    public StudentResponseDTO updateStudent(
            @PathVariable Long id,
            @RequestBody StudentRequestDTO request) {

        return service.updateStudent(id, request);
    }

    @DeleteMapping("/{id}")
    public String deactivateStudent(
            @PathVariable Long id) {

        service.deactivateStudent(id);

        return "Student deactivated successfully";
    }
}