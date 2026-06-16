package in.yuktisoftwares.studentBatch.serviceImpl;

import in.yuktisoftwares.studentBatch.dto.StudentBatchRequestDTO;
import in.yuktisoftwares.studentBatch.dto.StudentBatchResponseDTO;
import in.yuktisoftwares.studentBatch.entity.StudentBatchEntity;
import in.yuktisoftwares.studentBatch.entity.StudentBatchStatus;
import in.yuktisoftwares.studentBatch.repository.StudentBatchRepository;
import in.yuktisoftwares.studentBatch.service.StudentBatchService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class StudentBatchServiceImpl implements StudentBatchService {

    private final StudentBatchRepository repository;

    @Override
    public StudentBatchResponseDTO assignStudent(
            StudentBatchRequestDTO request) {

        StudentBatchEntity mapping =
                StudentBatchEntity.builder()
                        .studentId(request.getStudentId())
                        .batchId(request.getBatchId())
                        .status(StudentBatchStatus.ACTIVE)
                        .build();

        return map(repository.save(mapping));
    }

    @Override
    public List<StudentBatchResponseDTO> getAllMappings() {

        return repository.findAll()
                .stream()
                .map(this::map)
                .toList();
    }

    @Override
    public void removeStudentFromBatch(Long id) {

        StudentBatchEntity mapping =
                repository.findById(id)
                        .orElseThrow(() ->
                                new RuntimeException("Mapping not found"));

        mapping.setStatus(StudentBatchStatus.LEFT);

        repository.save(mapping);
    }

    private StudentBatchResponseDTO map(
            StudentBatchEntity entity) {

        return StudentBatchResponseDTO.builder()
                .id(entity.getId())
                .studentId(entity.getStudentId())
                .batchId(entity.getBatchId())
                .status(entity.getStatus())
                .build();
    }
}