package in.yuktisoftwares.assignment.serviceImpl;

import in.yuktisoftwares.assignment.dto.AssignmentRequestDTO;
import in.yuktisoftwares.assignment.dto.AssignmentResponseDTO;
import in.yuktisoftwares.assignment.entity.AssignmentEntity;
import in.yuktisoftwares.assignment.repository.AssignmentRepository;
import in.yuktisoftwares.assignment.service.AssignmentService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AssignmentServiceImpl
        implements AssignmentService {

    private final AssignmentRepository repository;

    @Override
    public AssignmentResponseDTO createAssignment(
            AssignmentRequestDTO request) {

        AssignmentEntity assignment =
                AssignmentEntity.builder()
                        .moduleId(request.getModuleId())
                        .batchId(request.getBatchId())
                        .title(request.getTitle())
                        .description(request.getDescription())
                        .createdBy(request.getCreatedBy())
                        .dueDate(request.getDueDate())
                        .build();

        return map(repository.save(assignment));
    }

    @Override
    public AssignmentResponseDTO getAssignmentById(Long id) {

        return map(repository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Assignment not found")));
    }

    @Override
    public List<AssignmentResponseDTO> getAllAssignments() {

        return repository.findAll()
                .stream()
                .map(this::map)
                .toList();
    }

    @Override
    public AssignmentResponseDTO updateAssignment(
            Long id,
            AssignmentRequestDTO request) {

        AssignmentEntity assignment =
                repository.findById(id)
                        .orElseThrow(() ->
                                new RuntimeException("Assignment not found"));

        assignment.setModuleId(request.getModuleId());
        assignment.setBatchId(request.getBatchId());
        assignment.setTitle(request.getTitle());
        assignment.setDescription(request.getDescription());
        assignment.setCreatedBy(request.getCreatedBy());
        assignment.setDueDate(request.getDueDate());

        return map(repository.save(assignment));
    }

    @Override
    public void deactivateAssignment(Long id) {

        AssignmentEntity assignment =
                repository.findById(id)
                        .orElseThrow(() ->
                                new RuntimeException("Assignment not found"));

        assignment.setStatus("INACTIVE");

        repository.save(assignment);
    }

    private AssignmentResponseDTO map(
            AssignmentEntity assignment) {

        return AssignmentResponseDTO.builder()
                .id(assignment.getId())
                .moduleId(assignment.getModuleId())
                .batchId(assignment.getBatchId())
                .title(assignment.getTitle())
                .description(assignment.getDescription())
                .createdBy(assignment.getCreatedBy())
                .dueDate(assignment.getDueDate())
                .status(assignment.getStatus())
                .build();
    }
}