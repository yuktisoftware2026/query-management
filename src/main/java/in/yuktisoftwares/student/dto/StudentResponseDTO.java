package in.yuktisoftwares.student.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class StudentResponseDTO {

    private Long id;

    private String name;

    private String email;

    private String phone;

    private String status;
}