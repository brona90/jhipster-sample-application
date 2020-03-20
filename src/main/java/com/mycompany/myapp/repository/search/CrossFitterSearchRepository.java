package com.mycompany.myapp.repository.search;

import com.mycompany.myapp.domain.CrossFitter;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the {@link CrossFitter} entity.
 */
public interface CrossFitterSearchRepository extends ElasticsearchRepository<CrossFitter, Long> {
}
