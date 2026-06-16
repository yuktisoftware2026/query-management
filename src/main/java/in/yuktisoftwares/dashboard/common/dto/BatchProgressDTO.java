package in.yuktisoftwares.dashboard.common.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class BatchProgressDTO {

    private long totalModules;
    private long completedModules;
    private double progressPercentage;
}