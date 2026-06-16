package in.yuktisoftwares.attendance.repository;

import in.yuktisoftwares.attendance.entity.AttendanceEntity;
import in.yuktisoftwares.attendance.entity.AttendanceStatus;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AttendanceRepository
        extends JpaRepository<AttendanceEntity, Long> {
    long countByStudentId(Long studentId);

    long countByStudentIdAndStatus(
            Long studentId,
            AttendanceStatus status);
}