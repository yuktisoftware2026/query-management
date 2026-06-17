package in.yuktisoftwares.notes.controller;

import in.yuktisoftwares.notes.dto.NotesRequestDTO;
import in.yuktisoftwares.notes.dto.NotesResponseDTO;
import in.yuktisoftwares.notes.service.NotesService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/notes")
@RequiredArgsConstructor
public class NotesController {

    private final NotesService service;

    @PostMapping
    public NotesResponseDTO createNotes(
            @RequestBody NotesRequestDTO request) {

        return service.createNotes(request);
    }

    @GetMapping("/{id}")
    public NotesResponseDTO getNotes(
            @PathVariable Long id) {

        return service.getNotesById(id);
    }

    @GetMapping
    public List<NotesResponseDTO> getAllNotes() {

        return service.getAllNotes();
    }

    @PutMapping("/{id}")
    public NotesResponseDTO updateNotes(
            @PathVariable Long id,
            @RequestBody NotesRequestDTO request) {

        return service.updateNotes(id, request);
    }

    @DeleteMapping("/{id}")
    public String deactivateNotes(
            @PathVariable Long id) {

        service.deactivateNotes(id);

        return "Notes deactivated successfully";
    }
}