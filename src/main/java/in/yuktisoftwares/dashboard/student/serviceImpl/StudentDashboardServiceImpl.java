package in.yuktisoftwares.dashboard.student.serviceImpl;

import in.yuktisoftwares.assignmentSubmission.repository.SubmissionRepository;
import in.yuktisoftwares.attendance.entity.AttendanceStatus;
import in.yuktisoftwares.attendance.repository.AttendanceRepository;
import in.yuktisoftwares.dashboard.student.dto.StudentDashboardResponseDTO;
import in.yuktisoftwares.dashboard.student.service.StudentDashboardService;
import in.yuktisoftwares.studentBatch.repository.StudentBatchRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class StudentDashboardServiceImpl
        implements StudentDashboardService {

    private final StudentBatchRepository studentBatchRepository;
    private final SubmissionRepository submissionRepository;
    private final AttendanceRepository attendanceRepository;

    @Override
    public StudentDashboardResponseDTO getDashboard(Long studentId) {

        long totalAttendance =
                attendanceRepository.countByStudentId(studentId);

        long presentAttendance =
                attendanceRepository.countByStudentIdAndStatus(
                        studentId,
                        AttendanceStatus.PRESENT);

        double attendancePercentage = 0;

        if (totalAttendance > 0) {

            attendancePercentage =
                    (presentAttendance * 100.0) /
                            totalAttendance;
        }

        return StudentDashboardResponseDTO.builder()
                .enrolledBatches(
                        studentBatchRepository.countByStudentId(
                                studentId))
                .submittedAssignments(
                        submissionRepository.countByStudentId(
                                studentId))
                .attendancePercentage(
                        attendancePercentage)
                .build();
    }
}