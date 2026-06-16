package in.yuktisoftwares.notes.dto;

import lombok.Data;

@Data
public class NotesRequestDTO {

    private Long moduleId;

    private Long batchId;

    private String title;

    private String description;

    private String fileUrl;

    private Long uploadedBy;
}