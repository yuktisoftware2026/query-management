package in.yuktisoftwares.faculty.repository;

import in.yuktisoftwares.faculty.entity.FacultyEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FacultyRepository extends JpaRepository<FacultyEntity, Long> {
    List<FacultyEntity> findByStatus(String status);
}