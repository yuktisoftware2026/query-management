package in.yuktisoftwares.module.serviceImpl;

import in.yuktisoftwares.module.dto.ModuleRequestDTO;
import in.yuktisoftwares.module.dto.ModuleResponseDTO;
import in.yuktisoftwares.module.entity.ModuleEntity;
import in.yuktisoftwares.module.entity.ModuleStatus;
import in.yuktisoftwares.module.repository.ModuleRepository;
import in.yuktisoftwares.module.service.ModuleService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ModuleServiceImpl implements ModuleService {

    private final ModuleRepository repository;

    @Override
    public ModuleResponseDTO createModule(ModuleRequestDTO request) {

        ModuleEntity module = ModuleEntity.builder()
                .courseId(request.getCourseId())
                .title(request.getTitle())
                .description(request.getDescription())
                .sequenceNo(request.getSequenceNo())
                .status(ModuleStatus.NOT_STARTED)
                .build();

        return map(repository.save(module));
    }

    @Override
    public ModuleResponseDTO getModuleById(Long id) {

        return map(repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Module not found")));
    }

    @Override
    public List<ModuleResponseDTO> getAllModules() {

        return repository.findAll()
                .stream()
                .map(this::map)
                .toList();
    }

    @Override
    public ModuleResponseDTO updateModule(Long id,
                                          ModuleRequestDTO request) {

        ModuleEntity module = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Module not found"));

        module.setCourseId(request.getCourseId());
        module.setTitle(request.getTitle());
        module.setDescription(request.getDescription());
        module.setSequenceNo(request.getSequenceNo());

        return map(repository.save(module));
    }

    @Override
    public void completeModule(Long id) {

        ModuleEntity module = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Module not found"));

        module.setStatus(ModuleStatus.COMPLETED);

        repository.save(module);
    }

    private ModuleResponseDTO map(ModuleEntity module) {

        return ModuleResponseDTO.builder()
                .id(module.getId())
                .courseId(module.getCourseId())
                .title(module.getTitle())
                .description(module.getDescription())
                .sequenceNo(module.getSequenceNo())
                .status(module.getStatus())
                .build();
    }
}