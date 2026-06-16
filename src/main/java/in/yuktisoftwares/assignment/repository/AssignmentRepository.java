package in.yuktisoftwares.assignment.repository;

import in.yuktisoftwares.assignment.entity.AssignmentEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AssignmentRepository
        extends JpaRepository<AssignmentEntity, Long> {
    long countByCreatedBy(Long facultyId);

}