package in.yuktisoftwares.dashboard.student.controller;

import in.yuktisoftwares.dashboard.student.dto.StudentDashboardResponseDTO;
import in.yuktisoftwares.dashboard.student.service.StudentDashboardService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/student/dashboard")
@RequiredArgsConstructor
public class StudentDashboardController {

    private final StudentDashboardService service;

    @GetMapping("/{studentId}")
    public StudentDashboardResponseDTO getDashboard(
            @PathVariable Long studentId) {

        return service.getDashboard(studentId);
    }
}