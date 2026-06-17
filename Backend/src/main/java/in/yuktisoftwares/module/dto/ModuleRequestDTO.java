package in.yuktisoftwares.module.dto;

import lombok.Data;

@Data
public class ModuleRequestDTO {

    private Long courseId;

    private String title;

    private String description;

    private Integer sequenceNo;
}