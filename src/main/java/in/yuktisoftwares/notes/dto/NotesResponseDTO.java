package in.yuktisoftwares.notes.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class NotesResponseDTO {

    private Long id;

    private Long moduleId;

    private Long batchId;

    private String title;

    private String description;

    private String fileUrl;

    private Long uploadedBy;

    private String status;
}