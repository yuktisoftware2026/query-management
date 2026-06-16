package in.yuktisoftwares.batch.repository;

import in.yuktisoftwares.batch.entity.BatchEntity;
import in.yuktisoftwares.batch.entity.BatchStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BatchRepository extends JpaRepository<BatchEntity, Long> {

    long countByStatus(BatchStatus status);

    long countByFacultyId(Long facultyId);

    List<BatchEntity> findByFacultyId(Long facultyId);
    long countByMentorId(Long mentorId);

    List<BatchEntity> findByMentorId(Long mentorId);


}