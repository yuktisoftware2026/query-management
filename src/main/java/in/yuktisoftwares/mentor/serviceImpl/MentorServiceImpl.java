package in.yuktisoftwares.mentor.serviceImpl;

import in.yuktisoftwares.exception.ResourceNotFoundException;
import in.yuktisoftwares.mentor.dto.MentorRequestDTO;
import in.yuktisoftwares.mentor.dto.MentorResponseDTO;
import in.yuktisoftwares.mentor.entity.MentorEntity;
import in.yuktisoftwares.mentor.repository.MentorRepository;
import in.yuktisoftwares.mentor.service.MentorService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MentorServiceImpl implements MentorService {

    private final MentorRepository repository;

    @Override
    public MentorResponseDTO createMentor(MentorRequestDTO request) {
        MentorEntity mentor = MentorEntity.builder()
                .name(request.getName())
                .email(request.getEmail())
                .phone(request.getPhone())
                .expertise(request.getExpertise())
                .status("ACTIVE")
                .build();
        return map(repository.save(mentor));
    }

    @Override
    public MentorResponseDTO getMentorById(Long id) {
        return map(repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Mentor not found")));
    }

    @Override
    public List<MentorResponseDTO> getAllMentors() {
        return repository.findAll()
                .stream()
                .map(this::map)
                .toList();
    }

    @Override
    public MentorResponseDTO updateMentor(Long id, MentorRequestDTO request) {
        MentorEntity mentor = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Mentor not found"));

        mentor.setName(request.getName());
        mentor.setEmail(request.getEmail());
        mentor.setPhone(request.getPhone());
        mentor.setExpertise(request.getExpertise());

        return map(repository.save(mentor));
    }

    @Override
    public void deactivateMentor(Long id) {
        MentorEntity mentor = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Mentor not found"));
        mentor.setStatus("INACTIVE");
        repository.save(mentor);
    }

    private MentorResponseDTO map(MentorEntity mentor) {
        return MentorResponseDTO.builder()
                .id(mentor.getId())
                .name(mentor.getName())
                .email(mentor.getEmail())
                .phone(mentor.getPhone())
                .expertise(mentor.getExpertise())
                .status(mentor.getStatus())
                .build();
    }
}