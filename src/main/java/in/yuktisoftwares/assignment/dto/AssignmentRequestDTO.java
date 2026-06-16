package in.yuktisoftwares.assignment.dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class AssignmentRequestDTO {

    private Long moduleId;

    private Long batchId;

    private String title;

    private String description;

    private Long createdBy;

    private LocalDateTime dueDate;
}