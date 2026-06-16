package in.yuktisoftwares.batch.controller;

import in.yuktisoftwares.batch.dto.BatchRequestDTO;
import in.yuktisoftwares.batch.dto.BatchResponseDTO;
import in.yuktisoftwares.batch.service.BatchService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/batches")
@RequiredArgsConstructor
public class BatchController {

    private final BatchService service;

    @PostMapping
    public BatchResponseDTO createBatch(
            @RequestBody BatchRequestDTO request) {

        return service.createBatch(request);
    }

    @GetMapping("/{id}")
    public BatchResponseDTO getBatch(
            @PathVariable Long id) {

        return service.getBatchById(id);
    }

    @GetMapping
    public List<BatchResponseDTO> getAllBatches() {

        return service.getAllBatches();
    }

    @PutMapping("/{id}")
    public BatchResponseDTO updateBatch(
            @PathVariable Long id,
            @RequestBody BatchRequestDTO request) {

        return service.updateBatch(id, request);
    }

    @DeleteMapping("/{id}")
    public String archiveBatch(
            @PathVariable Long id) {

        service.archiveBatch(id);

        return "Batch archived successfully";
    }
}