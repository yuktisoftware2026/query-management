package in.yuktisoftwares.classSession.dto;

import lombok.Data;

import java.time.LocalDate;
import java.time.LocalTime;

@Data
public class ClassSessionRequestDTO {

    private Long batchId;

    private Long moduleId;

    private String title;

    private LocalDate sessionDate;

    private LocalTime startTime;

    private LocalTime endTime;

    private Long createdBy;
}