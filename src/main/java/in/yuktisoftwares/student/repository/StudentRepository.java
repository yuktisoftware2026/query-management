package in.yuktisoftwares.student.repository;

import in.yuktisoftwares.student.entity.StudentEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StudentRepository
        extends JpaRepository<StudentEntity, Long> {
}