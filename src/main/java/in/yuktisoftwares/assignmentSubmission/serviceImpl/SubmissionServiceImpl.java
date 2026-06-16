package in.yuktisoftwares.assignmentSubmission.serviceImpl;

import in.yuktisoftwares.assignmentSubmission.dto.SubmissionRequestDTO;
import in.yuktisoftwares.assignmentSubmission.dto.SubmissionResponseDTO;
import in.yuktisoftwares.assignmentSubmission.entity.SubmissionEntity;
import in.yuktisoftwares.assignmentSubmission.repository.SubmissionRepository;
import in.yuktisoftwares.assignmentSubmission.service.SubmissionService;
import in.yuktisoftwares.exception.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import in.yuktisoftwares.assignment.repository.AssignmentRepository;
import in.yuktisoftwares.student.repository.StudentRepository;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class SubmissionServiceImpl implements SubmissionService {

    private final SubmissionRepository repository;
    private final AssignmentRepository assignmentRepository;
    private final StudentRepository studentRepository;


    @Override
    public SubmissionResponseDTO submitAssignment(
            SubmissionRequestDTO request) {

        if (!assignmentRepository.existsById(
                request.getAssignmentId())) {

            throw new ResourceNotFoundException(
                    "Assignment not found");
        }

        if (!studentRepository.existsById(
                request.getStudentId())) {

            throw new ResourceNotFoundException(
                    "Student not found");
        }

        SubmissionEntity submission =
                SubmissionEntity.builder()
                        .assignmentId(request.getAssignmentId())
                        .studentId(request.getStudentId())
                        .submissionType(request.getSubmissionType())
                        .githubLink(request.getGithubLink())
                        .fileUrl(request.getFileUrl())
                        .codeSnippet(request.getCodeSnippet())
                        .build();

        return map(repository.save(submission));
    }

    @Override
    public SubmissionResponseDTO getSubmissionById(Long id) {

        return map(repository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Submission not found")));
    }

    @Override
    public List<SubmissionResponseDTO> getAllSubmissions() {

        return repository.findAll()
                .stream()
                .map(this::map)
                .toList();
    }

    @Override
    public SubmissionResponseDTO reviewSubmission(
            Long id,
            Integer marks,
            String feedback) {

        SubmissionEntity submission =
                repository.findById(id)
                        .orElseThrow(() ->
                                new ResourceNotFoundException("Submission not found"));

        submission.setMarks(marks);
        submission.setFeedback(feedback);
        submission.setReviewedAt(LocalDateTime.now());
        submission.setStatus("REVIEWED");

        return map(repository.save(submission));
    }

    private SubmissionResponseDTO map(
            SubmissionEntity submission) {

        return SubmissionResponseDTO.builder()
                .id(submission.getId())
                .assignmentId(submission.getAssignmentId())
                .studentId(submission.getStudentId())
                .submissionType(submission.getSubmissionType())
                .githubLink(submission.getGithubLink())
                .fileUrl(submission.getFileUrl())
                .codeSnippet(submission.getCodeSnippet())
                .marks(submission.getMarks())
                .feedback(submission.getFeedback())
                .status(submission.getStatus())
                .build();
    }
}