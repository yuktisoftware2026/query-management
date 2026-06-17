package in.yuktisoftwares.dashboard.common.controller;

import in.yuktisoftwares.dashboard.common.dto.BatchProgressDTO;
import in.yuktisoftwares.dashboard.common.service.BatchProgressService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/progress")
@RequiredArgsConstructor
public class BatchProgressController {

    private final BatchProgressService batchProgressService;

    @GetMapping("/{batchId}")
    public BatchProgressDTO getProgress(
            @PathVariable Long batchId) {

        return batchProgressService
                .getProgress(batchId);
    }
}