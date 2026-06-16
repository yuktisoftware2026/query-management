package in.yuktisoftwares.module.dto;

import in.yuktisoftwares.module.entity.ModuleStatus;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ModuleResponseDTO {

    private Long id;

    private Long courseId;

    private String title;

    private String description;

    private Integer sequenceNo;

    private ModuleStatus status;
}