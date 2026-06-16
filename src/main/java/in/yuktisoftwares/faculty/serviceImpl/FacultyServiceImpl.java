package in.yuktisoftwares.faculty.serviceImpl;

import in.yuktisoftwares.exception.ResourceNotFoundException;
import in.yuktisoftwares.faculty.dto.FacultyRequestDTO;
import in.yuktisoftwares.faculty.dto.FacultyResponseDTO;
import in.yuktisoftwares.faculty.entity.FacultyEntity;
import in.yuktisoftwares.faculty.repository.FacultyRepository;
import in.yuktisoftwares.faculty.service.FacultyService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class FacultyServiceImpl implements FacultyService {

    private final FacultyRepository repository;

    @Override
    public FacultyResponseDTO createFaculty(FacultyRequestDTO request) {
        FacultyEntity faculty = FacultyEntity.builder()
                .name(request.getName())
                .email(request.getEmail())
                .phone(request.getPhone())
                .specialization(request.getSpecialization())
                .status("ACTIVE")
                .build();
        return map(repository.save(faculty));
    }

    @Override
    public FacultyResponseDTO getFacultyById(Long id) {
        return map(repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Faculty not found")));
    }

    @Override
    public List<FacultyResponseDTO> getAllFaculties() {
        return repository.findAll()
                .stream()
                .map(this::map)
                .toList();
    }

    @Override
    public FacultyResponseDTO updateFaculty(Long id, FacultyRequestDTO request) {
        FacultyEntity faculty = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Faculty not found"));

        faculty.setName(request.getName());
        faculty.setEmail(request.getEmail());
        faculty.setPhone(request.getPhone());
        faculty.setSpecialization(request.getSpecialization());

        return map(repository.save(faculty));
    }

    @Override
    public void deactivateFaculty(Long id) {
        FacultyEntity faculty = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Faculty not found"));
        faculty.setStatus("INACTIVE");
        repository.save(faculty);
    }

    private FacultyResponseDTO map(FacultyEntity faculty) {
        return FacultyResponseDTO.builder()
                .id(faculty.getId())
                .name(faculty.getName())
                .email(faculty.getEmail())
                .phone(faculty.getPhone())
                .specialization(faculty.getSpecialization())
                .status(faculty.getStatus())
                .build();
    }
}