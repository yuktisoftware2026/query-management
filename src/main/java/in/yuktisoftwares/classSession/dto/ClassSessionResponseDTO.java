package in.yuktisoftwares.classSession.dto;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalTime;

@Data
@Builder
public class ClassSessionResponseDTO {

    private Long id;

    private Long batchId;

    private Long moduleId;

    private String title;

    private LocalDate sessionDate;

    private LocalTime startTime;

    private LocalTime endTime;

    private Long createdBy;
}