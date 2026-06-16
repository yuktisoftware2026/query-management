package in.yuktisoftwares.attendance.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "attendance")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AttendanceEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long sessionId;

    private Long studentId;

    @Enumerated(EnumType.STRING)
    private AttendanceStatus status;

    private String remarks;

    private LocalDateTime markedAt;

    @PrePersist
    public void prePersist() {

        markedAt = LocalDateTime.now();

        if(status == null){
            status = AttendanceStatus.PRESENT;
        }
    }
}