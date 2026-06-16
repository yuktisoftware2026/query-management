package in.yuktisoftwares.attendance.controller;

import in.yuktisoftwares.attendance.dto.AttendanceRequestDTO;
import in.yuktisoftwares.attendance.dto.AttendanceResponseDTO;
import in.yuktisoftwares.attendance.service.AttendanceService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/attendance")
@RequiredArgsConstructor
public class AttendanceController {

    private final AttendanceService service;

    @PostMapping
    public AttendanceResponseDTO markAttendance(
            @RequestBody AttendanceRequestDTO request) {

        return service.markAttendance(request);
    }

    @GetMapping("/{id}")
    public AttendanceResponseDTO getAttendance(
            @PathVariable Long id) {

        return service.getAttendanceById(id);
    }

    @GetMapping
    public List<AttendanceResponseDTO> getAllAttendance() {

        return service.getAllAttendance();
    }

    @PutMapping("/{id}")
    public AttendanceResponseDTO updateAttendance(
            @PathVariable Long id,
            @RequestBody AttendanceRequestDTO request) {

        return service.updateAttendance(id, request);
    }
}