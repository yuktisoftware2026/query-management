package in.yuktisoftwares.course.repository;

import in.yuktisoftwares.course.entity.CourseEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CourseRepository extends JpaRepository<CourseEntity, Long> {
}