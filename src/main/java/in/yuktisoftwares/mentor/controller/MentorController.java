package in.yuktisoftwares.mentor.controller;

import in.yuktisoftwares.mentor.dto.MentorRequestDTO;
import in.yuktisoftwares.mentor.dto.MentorResponseDTO;
import in.yuktisoftwares.mentor.service.MentorService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/mentor")
@RequiredArgsConstructor
public class MentorController {

    private final MentorService mentorService;

    @PostMapping
    public ResponseEntity<MentorResponseDTO> createMentor(@RequestBody MentorRequestDTO request) {
        return ResponseEntity.ok(mentorService.createMentor(request));
    }

    @GetMapping("/{id}")
    public ResponseEntity<MentorResponseDTO> getMentor(@PathVariable Long id) {
        return ResponseEntity.ok(mentorService.getMentorById(id));
    }

    @GetMapping
    public ResponseEntity<List<MentorResponseDTO>> getAllMentors() {
        return ResponseEntity.ok(mentorService.getAllMentors());
    }

    @PutMapping("/{id}")
    public ResponseEntity<MentorResponseDTO> updateMentor(@PathVariable Long id, @RequestBody MentorRequestDTO request) {
        return ResponseEntity.ok(mentorService.updateMentor(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deactivateMentor(@PathVariable Long id) {
        mentorService.deactivateMentor(id);
        return ResponseEntity.ok("Mentor deactivated successfully.");
    }
}