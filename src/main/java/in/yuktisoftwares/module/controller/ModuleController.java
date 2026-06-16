package in.yuktisoftwares.module.controller;

import in.yuktisoftwares.module.dto.ModuleRequestDTO;
import in.yuktisoftwares.module.dto.ModuleResponseDTO;
import in.yuktisoftwares.module.service.ModuleService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/modules")
@RequiredArgsConstructor
public class ModuleController {

    private final ModuleService service;

    @PostMapping
    public ModuleResponseDTO createModule(
            @RequestBody ModuleRequestDTO request) {

        return service.createModule(request);
    }

    @GetMapping("/{id}")
    public ModuleResponseDTO getModule(
            @PathVariable Long id) {

        return service.getModuleById(id);
    }

    @GetMapping
    public List<ModuleResponseDTO> getAllModules() {

        return service.getAllModules();
    }

    @PutMapping("/{id}")
    public ModuleResponseDTO updateModule(
            @PathVariable Long id,
            @RequestBody ModuleRequestDTO request) {

        return service.updateModule(id, request);
    }

    @PatchMapping("/{id}/complete")
    public String completeModule(
            @PathVariable Long id) {

        service.completeModule(id);

        return "Module marked as completed";
    }
}