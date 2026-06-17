package in.yuktisoftwares.mentor.repository;

import in.yuktisoftwares.mentor.entity.MentorEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MentorRepository extends JpaRepository<MentorEntity, Long> {
}