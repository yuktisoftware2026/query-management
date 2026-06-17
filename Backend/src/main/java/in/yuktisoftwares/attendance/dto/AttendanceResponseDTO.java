package in.yuktisoftwares.attendance.dto;

import in.yuktisoftwares.attendance.entity.AttendanceStatus;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class AttendanceResponseDTO {

    private Long id;

    private Long sessionId;

    private Long studentId;

    private AttendanceStatus status;

    private String remarks;
}