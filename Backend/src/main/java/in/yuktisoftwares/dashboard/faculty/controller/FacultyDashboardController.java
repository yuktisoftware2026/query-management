package in.yuktisoftwares.dashboard.faculty.controller;

import in.yuktisoftwares.dashboard.faculty.dto.FacultyDashboardResponseDTO;
import in.yuktisoftwares.dashboard.faculty.service.FacultyDashboardService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/faculty/dashboard")
@RequiredArgsConstructor
public class FacultyDashboardController {

    private final FacultyDashboardService service;

    @GetMapping("/{facultyId}")
    public FacultyDashboardResponseDTO getDashboard(
            @PathVariable Long facultyId) {

        return service.getDashboard(facultyId);
    }
}