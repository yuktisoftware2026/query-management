package in.yuktisoftwares.mentor.service;

import in.yuktisoftwares.mentor.dto.MentorRequestDTO;
import in.yuktisoftwares.mentor.dto.MentorResponseDTO;

import java.util.List;

public interface MentorService {
    MentorResponseDTO createMentor(MentorRequestDTO request);
    MentorResponseDTO getMentorById(Long id);
    List<MentorResponseDTO> getAllMentors();
    MentorResponseDTO updateMentor(Long id, MentorRequestDTO request);
    void deactivateMentor(Long id);
}