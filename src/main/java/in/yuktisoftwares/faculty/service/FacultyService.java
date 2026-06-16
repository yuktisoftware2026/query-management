package in.yuktisoftwares.faculty.service;

import in.yuktisoftwares.faculty.dto.FacultyRequestDTO;
import in.yuktisoftwares.faculty.dto.FacultyResponseDTO;

import java.util.List;

public interface FacultyService {
    FacultyResponseDTO createFaculty(FacultyRequestDTO request);
    FacultyResponseDTO getFacultyById(Long id);
    List<FacultyResponseDTO> getAllFaculties();
    FacultyResponseDTO updateFaculty(Long id, FacultyRequestDTO request);
    void deactivateFaculty(Long id);
}