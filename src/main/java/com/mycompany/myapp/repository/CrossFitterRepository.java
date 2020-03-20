package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.CrossFitter;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the CrossFitter entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CrossFitterRepository extends JpaRepository<CrossFitter, Long> {
}
