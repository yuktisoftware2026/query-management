package in.yuktisoftwares.assignmentSubmission.controller;

import in.yuktisoftwares.assignmentSubmission.dto.SubmissionRequestDTO;
import in.yuktisoftwares.assignmentSubmission.dto.SubmissionResponseDTO;
import in.yuktisoftwares.assignmentSubmission.service.SubmissionService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/submissions")
@RequiredArgsConstructor
public class SubmissionController {

    private final SubmissionService service;

    @PostMapping
    public SubmissionResponseDTO submitAssignment(
            @RequestBody SubmissionRequestDTO request) {

        return service.submitAssignment(request);
    }

    @GetMapping("/{id}")
    public SubmissionResponseDTO getSubmission(
            @PathVariable Long id) {

        return service.getSubmissionById(id);
    }

    @GetMapping
    public List<SubmissionResponseDTO> getAllSubmissions() {

        return service.getAllSubmissions();
    }

    @PatchMapping("/{id}/review")
    public SubmissionResponseDTO reviewSubmission(
            @PathVariable Long id,
            @RequestParam Integer marks,
            @RequestParam String feedback) {

        return service.reviewSubmission(
                id,
                marks,
                feedback);
    }
}