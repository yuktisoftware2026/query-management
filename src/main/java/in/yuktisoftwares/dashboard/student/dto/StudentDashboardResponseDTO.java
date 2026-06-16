package in.yuktisoftwares.dashboard.student.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class StudentDashboardResponseDTO {

    private Long enrolledBatches;

    private Long submittedAssignments;

    private Double attendancePercentage;
}