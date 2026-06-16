package in.yuktisoftwares.dashboard.faculty.serviceImpl;

import in.yuktisoftwares.assignment.repository.AssignmentRepository;
import in.yuktisoftwares.batch.entity.BatchEntity;
import in.yuktisoftwares.batch.repository.BatchRepository;
import in.yuktisoftwares.classSession.repository.ClassSessionRepository;
import in.yuktisoftwares.dashboard.faculty.dto.FacultyDashboardResponseDTO;
import in.yuktisoftwares.dashboard.faculty.service.FacultyDashboardService;
import in.yuktisoftwares.notes.repository.NotesRepository;
import in.yuktisoftwares.studentBatch.repository.StudentBatchRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class FacultyDashboardServiceImpl
        implements FacultyDashboardService {

    private final BatchRepository batchRepository;
    private final StudentBatchRepository studentBatchRepository;
    private final NotesRepository notesRepository;
    private final AssignmentRepository assignmentRepository;
    private final ClassSessionRepository classSessionRepository;

    @Override
    public FacultyDashboardResponseDTO getDashboard(Long facultyId) {

        long assignedBatches =
                batchRepository.countByFacultyId(facultyId);

        List<BatchEntity> batches =
                batchRepository.findByFacultyId(facultyId);

        long totalStudents = 0;

        for (BatchEntity batch : batches) {

            totalStudents +=
                    studentBatchRepository.countByBatchId(
                            batch.getId());
        }

        return FacultyDashboardResponseDTO.builder()
                .assignedBatches(assignedBatches)
                .totalStudents(totalStudents)
                .notesUploaded(
                        notesRepository.countByUploadedBy(
                                facultyId))
                .assignmentsCreated(
                        assignmentRepository.countByCreatedBy(
                                facultyId))
                .sessionsCreated(
                        classSessionRepository.countByCreatedBy(
                                facultyId))
                .build();
    }
}