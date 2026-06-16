package in.yuktisoftwares.module.service;

import in.yuktisoftwares.module.dto.ModuleRequestDTO;
import in.yuktisoftwares.module.dto.ModuleResponseDTO;

import java.util.List;

public interface ModuleService {

    ModuleResponseDTO createModule(ModuleRequestDTO request);

    ModuleResponseDTO getModuleById(Long id);

    List<ModuleResponseDTO> getAllModules();

    ModuleResponseDTO updateModule(Long id,
                                   ModuleRequestDTO request);

    void completeModule(Long id);
}