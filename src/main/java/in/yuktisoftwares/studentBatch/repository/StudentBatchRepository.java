package in.yuktisoftwares.studentBatch.repository;

import in.yuktisoftwares.studentBatch.entity.StudentBatchEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StudentBatchRepository
        extends JpaRepository<StudentBatchEntity, Long> {

    long countByBatchId(Long batchId);
    long countByStudentId(Long studentId);


}