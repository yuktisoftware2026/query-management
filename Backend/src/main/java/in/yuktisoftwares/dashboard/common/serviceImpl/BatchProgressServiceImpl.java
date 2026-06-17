package in.yuktisoftwares.dashboard.common.serviceImpl;

import in.yuktisoftwares.batch.entity.BatchEntity;
import in.yuktisoftwares.batch.repository.BatchRepository;
import in.yuktisoftwares.classSession.repository.ClassSessionRepository;
import in.yuktisoftwares.dashboard.common.dto.BatchProgressDTO;
import in.yuktisoftwares.dashboard.common.service.BatchProgressService;
import in.yuktisoftwares.exception.ResourceNotFoundException;
import in.yuktisoftwares.module.repository.ModuleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Service
@RequiredArgsConstructor
public class BatchProgressServiceImpl
        implements BatchProgressService {

    private final BatchRepository batchRepository;
    private final ModuleRepository moduleRepository;
    private final ClassSessionRepository classSessionRepository;

    @Override
    public BatchProgressDTO getProgress(Long batchId) {

        BatchEntity batch =
                batchRepository.findById(batchId)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Batch not found"));

        long totalModules =
                moduleRepository.countByCourseId(
                        batch.getCourseId());

        long completedModules =
                classSessionRepository
                        .countDistinctModuleIdByBatchIdAndSessionDateBefore(
                                batchId,
                                LocalDate.now());

        double progressPercentage = 0;

        if (totalModules > 0) {

            progressPercentage =
                    (completedModules * 100.0)
                            / totalModules;
        }

        return BatchProgressDTO.builder()
                .totalModules(totalModules)
                .completedModules(completedModules)
                .progressPercentage(progressPercentage)
                .build();
    }
}