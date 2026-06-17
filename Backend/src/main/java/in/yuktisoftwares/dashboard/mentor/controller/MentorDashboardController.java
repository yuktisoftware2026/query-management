package in.yuktisoftwares.dashboard.mentor.controller;

import in.yuktisoftwares.dashboard.mentor.dto.MentorDashboardResponseDTO;
import in.yuktisoftwares.dashboard.mentor.service.MentorDashboardService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/mentor/dashboard")
@RequiredArgsConstructor
public class MentorDashboardController {

    private final MentorDashboardService service;

    @GetMapping("/{mentorId}")
    public MentorDashboardResponseDTO getDashboard(
            @PathVariable Long mentorId) {

        return service.getDashboard(mentorId);
    }
}