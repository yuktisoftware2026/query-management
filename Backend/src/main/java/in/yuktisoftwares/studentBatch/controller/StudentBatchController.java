package in.yuktisoftwares.studentBatch.controller;

import in.yuktisoftwares.studentBatch.dto.StudentBatchRequestDTO;
import in.yuktisoftwares.studentBatch.dto.StudentBatchResponseDTO;
import in.yuktisoftwares.studentBatch.service.StudentBatchService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/student-batches")
@RequiredArgsConstructor
public class StudentBatchController {

    private final StudentBatchService service;

    @PostMapping
    public StudentBatchResponseDTO assignStudent(
            @RequestBody StudentBatchRequestDTO request) {

        return service.assignStudent(request);
    }

    @GetMapping
    public List<StudentBatchResponseDTO> getAllMappings() {

        return service.getAllMappings();
    }

    @DeleteMapping("/{id}")
    public String removeStudentFromBatch(
            @PathVariable Long id) {

        service.removeStudentFromBatch(id);

        return "Student removed from batch";
    }
}