package in.yuktisoftwares.classSession.service;

import in.yuktisoftwares.classSession.dto.ClassSessionRequestDTO;
import in.yuktisoftwares.classSession.dto.ClassSessionResponseDTO;

import java.util.List;

public interface ClassSessionService {

    ClassSessionResponseDTO createSession(
            ClassSessionRequestDTO request);

    ClassSessionResponseDTO getSessionById(Long id);

    List<ClassSessionResponseDTO> getAllSessions();

    ClassSessionResponseDTO updateSession(
            Long id,
            ClassSessionRequestDTO request);

    void deleteSession(Long id);
}