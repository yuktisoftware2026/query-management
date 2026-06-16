package in.yuktisoftwares.assignment.service;

import in.yuktisoftwares.assignment.dto.AssignmentRequestDTO;
import in.yuktisoftwares.assignment.dto.AssignmentResponseDTO;

import java.util.List;

public interface AssignmentService {

    AssignmentResponseDTO createAssignment(
            AssignmentRequestDTO request);

    AssignmentResponseDTO getAssignmentById(Long id);

    List<AssignmentResponseDTO> getAllAssignments();

    AssignmentResponseDTO updateAssignment(
            Long id,
            AssignmentRequestDTO request);

    void deactivateAssignment(Long id);
}