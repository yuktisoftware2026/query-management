package in.yuktisoftwares.classSession.repository;

import in.yuktisoftwares.classSession.entity.ClassSessionEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;

public interface ClassSessionRepository
        extends JpaRepository<ClassSessionEntity, Long> {
    long countByCreatedBy(Long facultyId);
    long countDistinctModuleIdByBatchIdAndSessionDateBefore(
            Long batchId,
            LocalDate date);
}