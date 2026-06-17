package in.yuktisoftwares.notes.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "notes")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class NotesEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long moduleId;

    private Long batchId;

    private String title;

    @Column(length = 3000)
    private String description;

    private String fileUrl;

    private Long uploadedBy;

    private String status;

    private LocalDateTime uploadedAt;

    @PrePersist
    public void prePersist() {

        uploadedAt = LocalDateTime.now();

        if(status == null){
            status = "ACTIVE";
        }
    }
}