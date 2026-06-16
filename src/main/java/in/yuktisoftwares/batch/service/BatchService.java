package in.yuktisoftwares.batch.service;

import in.yuktisoftwares.batch.dto.BatchRequestDTO;
import in.yuktisoftwares.batch.dto.BatchResponseDTO;

import java.util.List;

public interface BatchService {

    BatchResponseDTO createBatch(BatchRequestDTO request);

    BatchResponseDTO getBatchById(Long id);

    List<BatchResponseDTO> getAllBatches();

    BatchResponseDTO updateBatch(Long id,
                                 BatchRequestDTO request);

    void archiveBatch(Long id);
}