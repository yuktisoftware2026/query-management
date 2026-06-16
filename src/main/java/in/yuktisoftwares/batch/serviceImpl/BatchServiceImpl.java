package in.yuktisoftwares.batch.serviceImpl;

import in.yuktisoftwares.batch.dto.BatchRequestDTO;
import in.yuktisoftwares.batch.dto.BatchResponseDTO;
import in.yuktisoftwares.batch.entity.BatchEntity;
import in.yuktisoftwares.batch.entity.BatchStatus;
import in.yuktisoftwares.batch.repository.BatchRepository;
import in.yuktisoftwares.batch.service.BatchService;
import in.yuktisoftwares.exception.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BatchServiceImpl implements BatchService {

    private final BatchRepository repository;

    @Override
    public BatchResponseDTO createBatch(BatchRequestDTO request) {

        BatchEntity batch = BatchEntity.builder()
                .courseId(request.getCourseId())
                .batchName(request.getBatchName())
                .description(request.getDescription())
                .facultyId(request.getFacultyId())
                .mentorId(request.getMentorId())
                .startDate(request.getStartDate())
                .endDate(request.getEndDate())
                .status(BatchStatus.ACTIVE)
                .build();

        return map(repository.save(batch));
    }

    @Override
    public BatchResponseDTO getBatchById(Long id) {

        return map(repository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Batch not found")));
    }

    @Override
    public List<BatchResponseDTO> getAllBatches() {

        return repository.findAll()
                .stream()
                .map(this::map)
                .toList();
    }

    @Override
    public BatchResponseDTO updateBatch(Long id,
                                        BatchRequestDTO request) {

        BatchEntity batch = repository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Batch not found"));

        batch.setCourseId(request.getCourseId());
        batch.setBatchName(request.getBatchName());
        batch.setDescription(request.getDescription());
        batch.setFacultyId(request.getFacultyId());
        batch.setMentorId(request.getMentorId());
        batch.setStartDate(request.getStartDate());
        batch.setEndDate(request.getEndDate());

        return map(repository.save(batch));
    }

    @Override
    public void archiveBatch(Long id) {

        BatchEntity batch = repository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Batch not found"));

        batch.setStatus(BatchStatus.ARCHIVED);

        repository.save(batch);
    }

    private BatchResponseDTO map(BatchEntity batch) {

        return BatchResponseDTO.builder()
                .id(batch.getId())
                .courseId(batch.getCourseId())
                .batchName(batch.getBatchName())
                .description(batch.getDescription())
                .facultyId(batch.getFacultyId())
                .mentorId(batch.getMentorId())
                .status(batch.getStatus())
                .build();
    }
}