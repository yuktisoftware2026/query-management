package in.yuktisoftwares.assignment.repository;

import in.yuktisoftwares.assignment.entity.AssignmentEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AssignmentRepository
        extends JpaRepository<AssignmentEntity, Long> {

    long countByCreatedBy(Long facultyId);

    long countByBatchIdIn(List<Long> batchIds);
}