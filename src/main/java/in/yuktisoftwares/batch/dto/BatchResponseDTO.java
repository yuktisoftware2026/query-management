package in.yuktisoftwares.batch.dto;

import in.yuktisoftwares.batch.entity.BatchStatus;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class BatchResponseDTO {

    private Long id;

    private Long courseId;

    private String batchName;

    private String description;

    private Long facultyId;

    private Long mentorId;

    private BatchStatus status;
}