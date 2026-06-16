package in.yuktisoftwares.classSession.serviceImpl;

import in.yuktisoftwares.classSession.dto.ClassSessionRequestDTO;
import in.yuktisoftwares.classSession.dto.ClassSessionResponseDTO;
import in.yuktisoftwares.classSession.entity.ClassSessionEntity;
import in.yuktisoftwares.classSession.repository.ClassSessionRepository;
import in.yuktisoftwares.classSession.service.ClassSessionService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ClassSessionServiceImpl
        implements ClassSessionService {

    private final ClassSessionRepository repository;

    @Override
    public ClassSessionResponseDTO createSession(
            ClassSessionRequestDTO request) {

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
                        new RuntimeException("Session not found")));
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

        ClassSessionEntity session =
                repository.findById(id)
                        .orElseThrow(() ->
                                new RuntimeException("Session not found"));

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

        repository.deleteById(id);
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