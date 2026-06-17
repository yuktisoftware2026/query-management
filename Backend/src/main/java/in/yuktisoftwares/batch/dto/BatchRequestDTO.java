package in.yuktisoftwares.batch.dto;

import lombok.Data;

import java.time.LocalDate;

@Data
public class BatchRequestDTO {

    private Long courseId;

    private String batchName;

    private String description;

    private Long facultyId;

    private Long mentorId;

    private LocalDate startDate;

    private LocalDate endDate;
}