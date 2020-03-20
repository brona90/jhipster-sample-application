package com.mycompany.myapp.repository.search;

import com.mycompany.myapp.domain.CoreSkills;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the {@link CoreSkills} entity.
 */
public interface CoreSkillsSearchRepository extends ElasticsearchRepository<CoreSkills, Long> {
}
