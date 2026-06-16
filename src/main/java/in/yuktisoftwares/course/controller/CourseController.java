package in.yuktisoftwares.course.controller;

import in.yuktisoftwares.course.dto.CourseRequestDTO;
import in.yuktisoftwares.course.dto.CourseResponseDTO;
import in.yuktisoftwares.course.service.CourseService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/courses")
@RequiredArgsConstructor
public class CourseController {

    private final CourseService service;

    @PostMapping
    public CourseResponseDTO createCourse(
            @RequestBody CourseRequestDTO request) {

        return service.createCourse(request);
    }

    @GetMapping("/{id}")
    public CourseResponseDTO getCourse(
            @PathVariable Long id) {

        return service.getCourseById(id);
    }

    @GetMapping
    public List<CourseResponseDTO> getAllCourses() {

        return service.getAllCourses();
    }

    @PutMapping("/{id}")
    public CourseResponseDTO updateCourse(
            @PathVariable Long id,
            @RequestBody CourseRequestDTO request) {

        return service.updateCourse(id, request);
    }

    @DeleteMapping("/{id}")
    public String deactivateCourse(
            @PathVariable Long id) {

        service.deactivateCourse(id);

        return "Course deactivated successfully";
    }
}