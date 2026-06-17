package in.yuktisoftwares.studentBatch.dto;

import in.yuktisoftwares.studentBatch.entity.StudentBatchStatus;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class StudentBatchResponseDTO {

    private Long id;

    private Long studentId;

    private Long batchId;

    private StudentBatchStatus status;
}