package in.yuktisoftwares.course.service;

import in.yuktisoftwares.course.dto.CourseRequestDTO;
import in.yuktisoftwares.course.dto.CourseResponseDTO;

import java.util.List;

public interface CourseService {

    CourseResponseDTO createCourse(CourseRequestDTO request);

    CourseResponseDTO getCourseById(Long id);

    List<CourseResponseDTO> getAllCourses();

    CourseResponseDTO updateCourse(Long id, CourseRequestDTO request);

    void deactivateCourse(Long id);
}