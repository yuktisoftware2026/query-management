package in.yuktisoftwares.dashboard.student.service;

import in.yuktisoftwares.dashboard.student.dto.StudentDashboardResponseDTO;

public interface StudentDashboardService {

    StudentDashboardResponseDTO getDashboard(Long studentId);
}