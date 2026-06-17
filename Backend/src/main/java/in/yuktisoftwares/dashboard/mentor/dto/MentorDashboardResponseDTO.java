package in.yuktisoftwares.dashboard.mentor.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class MentorDashboardResponseDTO {

    private Long assignedBatches;

    private Long totalStudents;

    private Long sessions;

}