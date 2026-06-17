package in.yuktisoftwares.dashboard.faculty.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class FacultyDashboardResponseDTO {

    private Long assignedBatches;

    private Long totalStudents;

    private Long notesUploaded;

    private Long assignmentsCreated;

    private Long sessionsCreated;
}