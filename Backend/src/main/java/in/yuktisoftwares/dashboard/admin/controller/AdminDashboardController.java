package in.yuktisoftwares.dashboard.admin.controller;

import in.yuktisoftwares.dashboard.admin.dto.AdminDashboardResponseDTO;
import in.yuktisoftwares.dashboard.admin.service.AdminDashboardService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/admin/dashboard")
@RequiredArgsConstructor
public class AdminDashboardController {

    private final AdminDashboardService service;

    @GetMapping
    public AdminDashboardResponseDTO getDashboard() {

        return service.getDashboard();
    }
}