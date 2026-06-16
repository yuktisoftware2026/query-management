package in.yuktisoftwares.module.repository;

import in.yuktisoftwares.module.entity.ModuleEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ModuleRepository extends JpaRepository<ModuleEntity, Long> {
}