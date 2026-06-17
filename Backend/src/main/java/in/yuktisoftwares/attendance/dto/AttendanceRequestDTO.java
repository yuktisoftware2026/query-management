package in.yuktisoftwares.attendance.dto;

import in.yuktisoftwares.attendance.entity.AttendanceStatus;
import lombok.Data;

@Data
public class AttendanceRequestDTO {

    private Long sessionId;

    private Long studentId;

    private AttendanceStatus status;

    private String remarks;
}