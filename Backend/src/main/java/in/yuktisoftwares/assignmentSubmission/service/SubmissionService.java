package in.yuktisoftwares.assignmentSubmission.service;

import in.yuktisoftwares.assignmentSubmission.dto.SubmissionRequestDTO;
import in.yuktisoftwares.assignmentSubmission.dto.SubmissionResponseDTO;

import java.util.List;

public interface SubmissionService {

    SubmissionResponseDTO submitAssignment(
            SubmissionRequestDTO request);

    SubmissionResponseDTO getSubmissionById(Long id);

    List<SubmissionResponseDTO> getAllSubmissions();

    SubmissionResponseDTO reviewSubmission(
            Long id,
            Integer marks,
            String feedback);
}