package in.yuktisoftwares.studentBatch.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "student_batches")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class StudentBatchEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long studentId;

    private Long batchId;

    @Enumerated(EnumType.STRING)
    private StudentBatchStatus status;

    private LocalDateTime joinedAt;

    @PrePersist
    public void prePersist() {

        joinedAt = LocalDateTime.now();

        if(status == null){
            status = StudentBatchStatus.ACTIVE;
        }
    }
}