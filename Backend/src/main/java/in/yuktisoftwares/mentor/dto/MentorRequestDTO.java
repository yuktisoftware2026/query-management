package in.yuktisoftwares.mentor.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class MentorRequestDTO {
    private String name;
    private String email;
    private String phone;
    private String expertise;
}