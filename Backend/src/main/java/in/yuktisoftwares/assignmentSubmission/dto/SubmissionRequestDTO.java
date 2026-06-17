package in.yuktisoftwares.assignmentSubmission.dto;

import lombok.Data;

@Data
public class SubmissionRequestDTO {

    private Long assignmentId;

    private Long studentId;

    private String submissionType;

    private String githubLink;

    private String fileUrl;

    private String codeSnippet;
}