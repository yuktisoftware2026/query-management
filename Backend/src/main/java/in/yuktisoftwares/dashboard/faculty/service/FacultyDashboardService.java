package in.yuktisoftwares.dashboard.faculty.service;

import in.yuktisoftwares.dashboard.faculty.dto.FacultyDashboardResponseDTO;

public interface FacultyDashboardService {

    FacultyDashboardResponseDTO getDashboard(Long facultyId);

}