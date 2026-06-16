package in.yuktisoftwares.classSession.serviceImpl;

import in.yuktisoftwares.classSession.dto.ClassSessionRequestDTO;
import in.yuktisoftwares.classSession.dto.ClassSessionResponseDTO;
import in.yuktisoftwares.classSession.entity.ClassSessionEntity;
import in.yuktisoftwares.classSession.repository.ClassSessionRepository;
import in.yuktisoftwares.classSession.service.ClassSessionService;
import in.yuktisoftwares.exception.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import in.yuktisoftwares.batch.repository.BatchRepository;
import in.yuktisoftwares.module.repository.ModuleRepository;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ClassSessionServiceImpl
        implements ClassSessionService {

    private final ClassSessionRepository repository;
    private final BatchRepository batchRepository;
    private final ModuleRepository moduleRepository;

    @Override
    public ClassSessionResponseDTO createSession(
            ClassSessionRequestDTO request) {

        if (!batchRepository.existsById(
                request.getBatchId())) {

            throw new ResourceNotFoundException(
                    "Batch not found");
        }

        if (!moduleRepository.existsById(
                request.getModuleId())) {

            throw new ResourceNotFoundException(
                    "Module not found");
        }

        ClassSessionEntity session =
                ClassSessionEntity.builder()
                        .batchId(request.getBatchId())
                        .moduleId(request.getModuleId())
                        .title(request.getTitle())
                        .sessionDate(request.getSessionDate())
                        .startTime(request.getStartTime())
                        .endTime(request.getEndTime())
                        .createdBy(request.getCreatedBy())
                        .build();

        return map(repository.save(session));
    }
    @Override
    public ClassSessionResponseDTO getSessionById(Long id) {

        return map(repository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Session not found")));
    }

    @Override
    public List<ClassSessionResponseDTO> getAllSessions() {

        return repository.findAll()
                .stream()
                .map(this::map)
                .toList();
    }

    @Override
    public ClassSessionResponseDTO updateSession(
            Long id,
            ClassSessionRequestDTO request) {

        if (!batchRepository.existsById(
                request.getBatchId())) {

            throw new ResourceNotFoundException(
                    "Batch not found");
        }

        if (!moduleRepository.existsById(
                request.getModuleId())) {

            throw new ResourceNotFoundException(
                    "Module not found");
        }

        ClassSessionEntity session =
                repository.findById(id)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Session not found"));

        session.setBatchId(request.getBatchId());
        session.setModuleId(request.getModuleId());
        session.setTitle(request.getTitle());
        session.setSessionDate(request.getSessionDate());
        session.setStartTime(request.getStartTime());
        session.setEndTime(request.getEndTime());

        return map(repository.save(session));
    }

    @Override
    public void deleteSession(Long id) {

        ClassSessionEntity session =
                repository.findById(id)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Session not found"));

        repository.delete(session);
    }

    private ClassSessionResponseDTO map(
            ClassSessionEntity session) {

        return ClassSessionResponseDTO.builder()
                .id(session.getId())
                .batchId(session.getBatchId())
                .moduleId(session.getModuleId())
                .title(session.getTitle())
                .sessionDate(session.getSessionDate())
                .startTime(session.getStartTime())
                .endTime(session.getEndTime())
                .createdBy(session.getCreatedBy())
                .build();
    }
}