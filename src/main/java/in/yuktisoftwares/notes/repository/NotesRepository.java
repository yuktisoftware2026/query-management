package in.yuktisoftwares.notes.repository;

import in.yuktisoftwares.notes.entity.NotesEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NotesRepository
        extends JpaRepository<NotesEntity, Long> {
    long countByUploadedBy(Long facultyId);

}