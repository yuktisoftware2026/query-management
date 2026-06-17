package in.yuktisoftwares.dashboard.student.serviceImpl;

import in.yuktisoftwares.assignmentSubmission.repository.SubmissionRepository;
import in.yuktisoftwares.attendance.entity.AttendanceStatus;
import in.yuktisoftwares.attendance.repository.AttendanceRepository;
import in.yuktisoftwares.dashboard.student.dto.StudentDashboardResponseDTO;
import in.yuktisoftwares.dashboard.student.service.StudentDashboardService;
import in.yuktisoftwares.studentBatch.repository.StudentBatchRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import in.yuktisoftwares.assignment.repository.AssignmentRepository;
import in.yuktisoftwares.studentBatch.entity.StudentBatchEntity;

import java.util.List;

@Service
@RequiredArgsConstructor
public class StudentDashboardServiceImpl
        implements StudentDashboardService {

    private final StudentBatchRepository studentBatchRepository;
    private final SubmissionRepository submissionRepository;
    private final AttendanceRepository attendanceRepository;
    private final AssignmentRepository assignmentRepository;

    @Override
    public StudentDashboardResponseDTO getDashboard(Long studentId) {

        long enrolledBatches =
                studentBatchRepository.countByStudentId(
                        studentId);

        long submittedAssignments =
                submissionRepository.countByStudentId(
                        studentId);

        List<StudentBatchEntity> mappings =
                studentBatchRepository.findByStudentId(
                        studentId);

        List<Long> batchIds =
                mappings.stream()
                        .map(StudentBatchEntity::getBatchId)
                        .toList();
        System.out.println("BatchIds = " + batchIds);

        long totalAssignments = 0;

        if (!batchIds.isEmpty()) {

            totalAssignments =
                    assignmentRepository.countByBatchIdIn(
                            batchIds);
        }
        System.out.println("Total Assignments = " + totalAssignments);


        long pendingAssignments =
                totalAssignments - submittedAssignments;

        if (pendingAssignments < 0) {
            pendingAssignments = 0;
        }
        

        long totalAttendance =
                attendanceRepository.countByStudentId(
                        studentId);

        long presentAttendance =
                attendanceRepository.countByStudentIdAndStatus(
                        studentId,
                        AttendanceStatus.PRESENT);

        double attendancePercentage = 0;

        if (totalAttendance > 0) {

            attendancePercentage =
                    (presentAttendance * 100.0)
                            / totalAttendance;
        }

        return StudentDashboardResponseDTO.builder()
                .enrolledBatches(enrolledBatches)
                .submittedAssignments(
                        submittedAssignments)
                .pendingAssignments(
                        pendingAssignments)
                .attendancePercentage(
                        attendancePercentage)
                .build();
    }
}