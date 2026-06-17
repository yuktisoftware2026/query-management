package in.yuktisoftwares.assignmentSubmission.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class SubmissionResponseDTO {

    private Long id;

    private Long assignmentId;

    private Long studentId;

    private String submissionType;

    private String githubLink;

    private String fileUrl;

    private String codeSnippet;

    private Integer marks;

    private String feedback;

    private String status;
}