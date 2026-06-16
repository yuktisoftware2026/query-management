package in.yuktisoftwares.course.dto;

import in.yuktisoftwares.course.entity.CourseStatus;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class CourseResponseDTO {

    private Long id;

    private String courseName;

    private String description;

    private CourseStatus status;
}