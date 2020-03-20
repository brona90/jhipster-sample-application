package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.CoreSkills;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the CoreSkills entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CoreSkillsRepository extends JpaRepository<CoreSkills, Long> {
}
