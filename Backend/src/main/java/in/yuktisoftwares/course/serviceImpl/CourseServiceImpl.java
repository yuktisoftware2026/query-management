package in.yuktisoftwares.course.serviceImpl;

import in.yuktisoftwares.course.dto.CourseRequestDTO;
import in.yuktisoftwares.course.dto.CourseResponseDTO;
import in.yuktisoftwares.course.entity.CourseEntity;
import in.yuktisoftwares.course.entity.CourseStatus;
import in.yuktisoftwares.course.repository.CourseRepository;
import in.yuktisoftwares.course.service.CourseService;
import in.yuktisoftwares.exception.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CourseServiceImpl implements CourseService {

    private final CourseRepository repository;

    @Override
    public CourseResponseDTO createCourse(CourseRequestDTO request) {

        CourseEntity course = CourseEntity.builder()
                .courseName(request.getCourseName())
                .description(request.getDescription())
                .status(CourseStatus.ACTIVE)
                .build();

        return map(repository.save(course));
    }

    @Override
    public CourseResponseDTO getCourseById(Long id) {

        CourseEntity course = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Course not found"));

        return map(course);
    }

    @Override
    public List<CourseResponseDTO> getAllCourses() {

        return repository.findAll()
                .stream()
                .map(this::map)
                .toList();
    }

    @Override
    public CourseResponseDTO updateCourse(Long id,
                                          CourseRequestDTO request) {

        CourseEntity course = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Course not found"));

        course.setCourseName(request.getCourseName());
        course.setDescription(request.getDescription());

        return map(repository.save(course));
    }

    @Override
    public void deactivateCourse(Long id) {

        CourseEntity course = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Course not found"));

        course.setStatus(CourseStatus.INACTIVE);

        repository.save(course);
    }

    private CourseResponseDTO map(CourseEntity course) {

        return CourseResponseDTO.builder()
                .id(course.getId())
                .courseName(course.getCourseName())
                .description(course.getDescription())
                .status(course.getStatus())
                .build();
    }
}