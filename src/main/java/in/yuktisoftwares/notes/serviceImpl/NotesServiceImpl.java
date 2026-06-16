package in.yuktisoftwares.notes.serviceImpl;

import in.yuktisoftwares.notes.dto.NotesRequestDTO;
import in.yuktisoftwares.notes.dto.NotesResponseDTO;
import in.yuktisoftwares.notes.entity.NotesEntity;
import in.yuktisoftwares.notes.repository.NotesRepository;
import in.yuktisoftwares.notes.service.NotesService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class NotesServiceImpl
        implements NotesService {

    private final NotesRepository repository;

    @Override
    public NotesResponseDTO createNotes(
            NotesRequestDTO request) {

        NotesEntity notes =
                NotesEntity.builder()
                        .moduleId(request.getModuleId())
                        .batchId(request.getBatchId())
                        .title(request.getTitle())
                        .description(request.getDescription())
                        .fileUrl(request.getFileUrl())
                        .uploadedBy(request.getUploadedBy())
                        .build();

        return map(repository.save(notes));
    }

    @Override
    public NotesResponseDTO getNotesById(Long id) {

        return map(repository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Notes not found")));
    }

    @Override
    public List<NotesResponseDTO> getAllNotes() {

        return repository.findAll()
                .stream()
                .map(this::map)
                .toList();
    }

    @Override
    public NotesResponseDTO updateNotes(
            Long id,
            NotesRequestDTO request) {

        NotesEntity notes =
                repository.findById(id)
                        .orElseThrow(() ->
                                new RuntimeException("Notes not found"));

        notes.setModuleId(request.getModuleId());
        notes.setBatchId(request.getBatchId());
        notes.setTitle(request.getTitle());
        notes.setDescription(request.getDescription());
        notes.setFileUrl(request.getFileUrl());
        notes.setUploadedBy(request.getUploadedBy());

        return map(repository.save(notes));
    }

    @Override
    public void deactivateNotes(Long id) {

        NotesEntity notes =
                repository.findById(id)
                        .orElseThrow(() ->
                                new RuntimeException("Notes not found"));

        notes.setStatus("INACTIVE");

        repository.save(notes);
    }

    private NotesResponseDTO map(
            NotesEntity notes) {

        return NotesResponseDTO.builder()
                .id(notes.getId())
                .moduleId(notes.getModuleId())
                .batchId(notes.getBatchId())
                .title(notes.getTitle())
                .description(notes.getDescription())
                .fileUrl(notes.getFileUrl())
                .uploadedBy(notes.getUploadedBy())
                .status(notes.getStatus())
                .build();
    }
}