package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.CoreSkill;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the CoreSkill entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CoreSkillRepository extends JpaRepository<CoreSkill, Long> {
}
