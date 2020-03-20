package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.Blocks;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Blocks entity.
 */
@SuppressWarnings("unused")
@Repository
public interface BlocksRepository extends JpaRepository<Blocks, Long> {
}
