package in.yuktisoftwares.student.serviceImpl;

import in.yuktisoftwares.exception.ResourceNotFoundException;
import in.yuktisoftwares.student.dto.StudentRequestDTO;
import in.yuktisoftwares.student.dto.StudentResponseDTO;
import in.yuktisoftwares.student.entity.StudentEntity;
import in.yuktisoftwares.student.repository.StudentRepository;
import in.yuktisoftwares.student.service.StudentService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class StudentServiceImpl implements StudentService {

    private final StudentRepository repository;

    @Override
    public StudentResponseDTO createStudent(StudentRequestDTO request) {

        StudentEntity student = StudentEntity.builder()
                .name(request.getName())
                .email(request.getEmail())
                .phone(request.getPhone())
                .build();

        return map(repository.save(student));
    }

    @Override
    public StudentResponseDTO getStudentById(Long id) {

        StudentEntity student = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Student not found"));

        return map(student);
    }

    @Override
    public List<StudentResponseDTO> getAllStudents() {

        return repository.findAll()
                .stream()
                .map(this::map)
                .toList();
    }

    @Override
    public StudentResponseDTO updateStudent(Long id,
                                            StudentRequestDTO request) {

        StudentEntity student = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Student not found"));

        student.setName(request.getName());
        student.setEmail(request.getEmail());
        student.setPhone(request.getPhone());

        return map(repository.save(student));
    }

    @Override
    public void deactivateStudent(Long id) {

        StudentEntity student = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Student not found"));

        student.setStatus("INACTIVE");

        repository.save(student);
    }

    private StudentResponseDTO map(StudentEntity student) {

        return StudentResponseDTO.builder()
                .id(student.getId())
                .name(student.getName())
                .email(student.getEmail())
                .phone(student.getPhone())
                .status(student.getStatus())
                .build();
    }
}