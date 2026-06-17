package in.yuktisoftwares.dashboard.mentor.serviceImpl;

import in.yuktisoftwares.batch.entity.BatchEntity;
import in.yuktisoftwares.batch.repository.BatchRepository;
import in.yuktisoftwares.classSession.repository.ClassSessionRepository;
import in.yuktisoftwares.dashboard.mentor.dto.MentorDashboardResponseDTO;
import in.yuktisoftwares.dashboard.mentor.service.MentorDashboardService;
import in.yuktisoftwares.studentBatch.repository.StudentBatchRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MentorDashboardServiceImpl
        implements MentorDashboardService {

    private final BatchRepository batchRepository;

    private final StudentBatchRepository studentBatchRepository;

    private final ClassSessionRepository classSessionRepository;

    @Override
    public MentorDashboardResponseDTO getDashboard(Long mentorId) {

        long assignedBatches =
                batchRepository.countByMentorId(mentorId);

        List<BatchEntity> batches =
                batchRepository.findByMentorId(mentorId);

        long totalStudents = 0;

        for (BatchEntity batch : batches) {

            totalStudents +=
                    studentBatchRepository.countByBatchId(
                            batch.getId());
        }

        return MentorDashboardResponseDTO.builder()
                .assignedBatches(assignedBatches)
                .totalStudents(totalStudents)
                .sessions(classSessionRepository.count())
                .build();
    }
}