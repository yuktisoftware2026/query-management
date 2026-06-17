package in.yuktisoftwares.student.service;

import in.yuktisoftwares.student.dto.StudentRequestDTO;
import in.yuktisoftwares.student.dto.StudentResponseDTO;

import java.util.List;

public interface StudentService {

    StudentResponseDTO createStudent(StudentRequestDTO request);

    StudentResponseDTO getStudentById(Long id);

    List<StudentResponseDTO> getAllStudents();

    StudentResponseDTO updateStudent(Long id,
                                     StudentRequestDTO request);

    void deactivateStudent(Long id);
}