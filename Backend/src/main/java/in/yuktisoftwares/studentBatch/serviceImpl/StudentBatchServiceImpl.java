package in.yuktisoftwares.studentBatch.serviceImpl;

import in.yuktisoftwares.batch.repository.BatchRepository;
import in.yuktisoftwares.student.repository.StudentRepository;
import in.yuktisoftwares.exception.ResourceNotFoundException;
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
    private final StudentRepository studentRepository;
    private final BatchRepository batchRepository;


    @Override
    public StudentBatchResponseDTO assignStudent(
            StudentBatchRequestDTO request) {

        if (!studentRepository.existsById(
                request.getStudentId())) {

            throw new ResourceNotFoundException(
                    "Student not found");
        }

        if (!batchRepository.existsById(
                request.getBatchId())) {

            throw new ResourceNotFoundException(
                    "Batch not found");
        }

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
                                new ResourceNotFoundException("Mapping not found"));

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