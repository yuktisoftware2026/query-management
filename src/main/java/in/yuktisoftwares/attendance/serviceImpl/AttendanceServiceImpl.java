package in.yuktisoftwares.attendance.serviceImpl;

import in.yuktisoftwares.attendance.dto.AttendanceRequestDTO;
import in.yuktisoftwares.attendance.dto.AttendanceResponseDTO;
import in.yuktisoftwares.attendance.entity.AttendanceEntity;
import in.yuktisoftwares.attendance.repository.AttendanceRepository;
import in.yuktisoftwares.attendance.service.AttendanceService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AttendanceServiceImpl
        implements AttendanceService {

    private final AttendanceRepository repository;

    @Override
    public AttendanceResponseDTO markAttendance(
            AttendanceRequestDTO request) {

        AttendanceEntity attendance =
                AttendanceEntity.builder()
                        .sessionId(request.getSessionId())
                        .studentId(request.getStudentId())
                        .status(request.getStatus())
                        .remarks(request.getRemarks())
                        .build();

        return map(repository.save(attendance));
    }

    @Override
    public AttendanceResponseDTO getAttendanceById(Long id) {

        return map(repository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Attendance not found")));
    }

    @Override
    public List<AttendanceResponseDTO> getAllAttendance() {

        return repository.findAll()
                .stream()
                .map(this::map)
                .toList();
    }

    @Override
    public AttendanceResponseDTO updateAttendance(
            Long id,
            AttendanceRequestDTO request) {

        AttendanceEntity attendance =
                repository.findById(id)
                        .orElseThrow(() ->
                                new RuntimeException("Attendance not found"));

        attendance.setStatus(request.getStatus());
        attendance.setRemarks(request.getRemarks());

        return map(repository.save(attendance));
    }

    private AttendanceResponseDTO map(
            AttendanceEntity attendance) {

        return AttendanceResponseDTO.builder()
                .id(attendance.getId())
                .sessionId(attendance.getSessionId())
                .studentId(attendance.getStudentId())
                .status(attendance.getStatus())
                .remarks(attendance.getRemarks())
                .build();
    }
}