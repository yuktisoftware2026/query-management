package in.yuktisoftwares.mentor.dto;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class MentorResponseDTO {
    private Long id;
    private String name;
    private String email;
    private String phone;
    private String expertise;
    private String status;
}