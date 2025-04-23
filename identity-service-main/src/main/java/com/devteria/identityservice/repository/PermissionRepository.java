    package com.devteria.identityservice.repository;

    import org.springframework.data.jpa.repository.JpaRepository;
    import org.springframework.stereotype.Repository;

    import com.devteria.identityservice.entity.Permission;

    import java.util.Set;

    @Repository
    public interface PermissionRepository extends JpaRepository<Permission, Long> {
        Set<Permission> findAllById(Set<Long> permissions);
    }
