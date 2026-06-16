package in.yuktisoftwares.assignment.dto;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class AssignmentResponseDTO {

    private Long id;

    private Long moduleId;

    private Long batchId;

    private String title;

    private String description;

    private Long createdBy;

    private LocalDateTime dueDate;

    private String status;
}