package in.yuktisoftwares.dashboard.admin.serviceImpl;

import in.yuktisoftwares.batch.entity.BatchStatus;
import in.yuktisoftwares.batch.repository.BatchRepository;
import in.yuktisoftwares.course.repository.CourseRepository;
import in.yuktisoftwares.dashboard.admin.dto.AdminDashboardResponseDTO;
import in.yuktisoftwares.dashboard.admin.service.AdminDashboardService;
import in.yuktisoftwares.faculty.repository.FacultyRepository;
import in.yuktisoftwares.mentor.repository.MentorRepository;
import in.yuktisoftwares.student.repository.StudentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AdminDashboardServiceImpl implements AdminDashboardService {

    private final StudentRepository studentRepository;
    private final FacultyRepository facultyRepository;
    private final MentorRepository mentorRepository;
    private final CourseRepository courseRepository;
    private final BatchRepository batchRepository;

    @Override
    public AdminDashboardResponseDTO getDashboard() {

        return AdminDashboardResponseDTO.builder()
                .totalStudents(studentRepository.count())
                .totalFaculty(facultyRepository.count())
                .totalMentors(mentorRepository.count())
                .totalCourses(courseRepository.count())
                .totalBatches(batchRepository.count())
                .activeBatches(
                        batchRepository.countByStatus(
                                BatchStatus.ACTIVE))
                .inactiveBatches(
                        batchRepository.countByStatus(
                                BatchStatus.ARCHIVED))
                .build();
    }
}