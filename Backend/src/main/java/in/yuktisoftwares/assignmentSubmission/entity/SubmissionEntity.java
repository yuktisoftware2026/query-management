package in.yuktisoftwares.assignmentSubmission.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "submissions")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SubmissionEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long assignmentId;

    private Long studentId;

    private String submissionType;

    private String githubLink;

    private String fileUrl;

    @Column(length = 10000)
    private String codeSnippet;

    private Integer marks;

    private String feedback;

    private String status;

    private LocalDateTime submittedAt;

    private LocalDateTime reviewedAt;

    @PrePersist
    public void prePersist() {

        submittedAt = LocalDateTime.now();

        if(status == null){
            status = "SUBMITTED";
        }
    }
}