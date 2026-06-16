package in.yuktisoftwares.faculty.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class FacultyResponseDTO {
    private Long id;
    private String name;
    private String email;
    private String phone;
    private String specialization;
    private String status;
}