package in.yuktisoftwares.studentBatch.service;

import in.yuktisoftwares.studentBatch.dto.StudentBatchRequestDTO;
import in.yuktisoftwares.studentBatch.dto.StudentBatchResponseDTO;

import java.util.List;

public interface StudentBatchService {

    StudentBatchResponseDTO assignStudent(
            StudentBatchRequestDTO request);

    List<StudentBatchResponseDTO> getAllMappings();

    void removeStudentFromBatch(Long id);
}