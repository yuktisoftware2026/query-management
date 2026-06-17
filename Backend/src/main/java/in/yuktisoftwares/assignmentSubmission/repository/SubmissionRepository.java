package in.yuktisoftwares.assignmentSubmission.repository;

import in.yuktisoftwares.assignmentSubmission.entity.SubmissionEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SubmissionRepository
        extends JpaRepository<SubmissionEntity, Long> {

    long countByStudentId(Long studentId);
}