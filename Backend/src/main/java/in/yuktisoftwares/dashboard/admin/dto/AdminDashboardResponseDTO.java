package in.yuktisoftwares.dashboard.admin.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class AdminDashboardResponseDTO {

    private Long totalStudents;

    private Long totalFaculty;

    private Long totalMentors;

    private Long totalCourses;

    private Long totalBatches;

    private Long activeBatches;

    private Long inactiveBatches;
}