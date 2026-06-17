package in.yuktisoftwares.attendance.service;

import in.yuktisoftwares.attendance.dto.AttendanceRequestDTO;
import in.yuktisoftwares.attendance.dto.AttendanceResponseDTO;

import java.util.List;

public interface AttendanceService {

    AttendanceResponseDTO markAttendance(
            AttendanceRequestDTO request);

    AttendanceResponseDTO getAttendanceById(Long id);

    List<AttendanceResponseDTO> getAllAttendance();

    AttendanceResponseDTO updateAttendance(
            Long id,
            AttendanceRequestDTO request);
}