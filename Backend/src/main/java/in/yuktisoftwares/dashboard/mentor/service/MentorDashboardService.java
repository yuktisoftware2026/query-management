package in.yuktisoftwares.dashboard.mentor.service;

import in.yuktisoftwares.dashboard.mentor.dto.MentorDashboardResponseDTO;

public interface MentorDashboardService {

    MentorDashboardResponseDTO getDashboard(Long mentorId);

}