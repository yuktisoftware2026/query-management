package in.yuktisoftwares.mentor.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "mentor")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MentorEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @Column(unique = true)
    private String email;

    private String phone;
    private String expertise;

    @Builder.Default
    private String status = "ACTIVE";
}