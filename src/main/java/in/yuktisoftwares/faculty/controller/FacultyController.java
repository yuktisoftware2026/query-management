package in.yuktisoftwares.faculty.controller;

import in.yuktisoftwares.faculty.dto.FacultyRequestDTO;
import in.yuktisoftwares.faculty.dto.FacultyResponseDTO;
import in.yuktisoftwares.faculty.service.FacultyService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/faculty")
@RequiredArgsConstructor
public class FacultyController {

    private final FacultyService facultyService;

    @PostMapping
    public ResponseEntity<FacultyResponseDTO> createFaculty(@RequestBody FacultyRequestDTO request) {
        return ResponseEntity.ok(facultyService.createFaculty(request));
    }

    @GetMapping("/{id}")
    public ResponseEntity<FacultyResponseDTO> getFaculty(@PathVariable Long id) {
        return ResponseEntity.ok(facultyService.getFacultyById(id));
    }

    @GetMapping
    public ResponseEntity<List<FacultyResponseDTO>> getAllFaculties() {
        return ResponseEntity.ok(facultyService.getAllFaculties());
    }

    @PutMapping("/{id}")
    public ResponseEntity<FacultyResponseDTO> updateFaculty(@PathVariable Long id, @RequestBody FacultyRequestDTO request) {
        return ResponseEntity.ok(facultyService.updateFaculty(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deactivateFaculty(@PathVariable Long id) {
        facultyService.deactivateFaculty(id);
        return ResponseEntity.ok("Faculty deactivated successfully.");
    }
}