package in.yuktisoftwares.dashboard.student.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class StudentDashboardResponseDTO {

    private long enrolledBatches;
    private long submittedAssignments;
    private long pendingAssignments;
    private double attendancePercentage;
}