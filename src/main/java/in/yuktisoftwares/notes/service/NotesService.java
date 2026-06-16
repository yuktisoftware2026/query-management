package in.yuktisoftwares.notes.service;

import in.yuktisoftwares.notes.dto.NotesRequestDTO;
import in.yuktisoftwares.notes.dto.NotesResponseDTO;

import java.util.List;

public interface NotesService {

    NotesResponseDTO createNotes(
            NotesRequestDTO request);

    NotesResponseDTO getNotesById(Long id);

    List<NotesResponseDTO> getAllNotes();

    NotesResponseDTO updateNotes(
            Long id,
            NotesRequestDTO request);

    void deactivateNotes(Long id);
}