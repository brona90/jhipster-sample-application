package com.mycompany.myapp.repository.search;

import com.mycompany.myapp.domain.Blocks;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the {@link Blocks} entity.
 */
public interface BlocksSearchRepository extends ElasticsearchRepository<Blocks, Long> {
}
