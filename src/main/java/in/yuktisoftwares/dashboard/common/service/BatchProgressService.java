package in.yuktisoftwares.dashboard.common.service;

import in.yuktisoftwares.dashboard.common.dto.BatchProgressDTO;

public interface BatchProgressService {

    BatchProgressDTO getProgress(Long batchId);
}