package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.domain.CoreSkills;
import com.mycompany.myapp.repository.CoreSkillsRepository;
import com.mycompany.myapp.repository.search.CoreSkillsSearchRepository;
import com.mycompany.myapp.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * REST controller for managing {@link com.mycompany.myapp.domain.CoreSkills}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class CoreSkillsResource {

    private final Logger log = LoggerFactory.getLogger(CoreSkillsResource.class);

    private static final String ENTITY_NAME = "coreSkills";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final CoreSkillsRepository coreSkillsRepository;

    private final CoreSkillsSearchRepository coreSkillsSearchRepository;

    public CoreSkillsResource(CoreSkillsRepository coreSkillsRepository, CoreSkillsSearchRepository coreSkillsSearchRepository) {
        this.coreSkillsRepository = coreSkillsRepository;
        this.coreSkillsSearchRepository = coreSkillsSearchRepository;
    }

    /**
     * {@code POST  /core-skills} : Create a new coreSkills.
     *
     * @param coreSkills the coreSkills to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new coreSkills, or with status {@code 400 (Bad Request)} if the coreSkills has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/core-skills")
    public ResponseEntity<CoreSkills> createCoreSkills(@RequestBody CoreSkills coreSkills) throws URISyntaxException {
        log.debug("REST request to save CoreSkills : {}", coreSkills);
        if (coreSkills.getId() != null) {
            throw new BadRequestAlertException("A new coreSkills cannot already have an ID", ENTITY_NAME, "idexists");
        }
        CoreSkills result = coreSkillsRepository.save(coreSkills);
        coreSkillsSearchRepository.save(result);
        return ResponseEntity.created(new URI("/api/core-skills/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /core-skills} : Updates an existing coreSkills.
     *
     * @param coreSkills the coreSkills to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated coreSkills,
     * or with status {@code 400 (Bad Request)} if the coreSkills is not valid,
     * or with status {@code 500 (Internal Server Error)} if the coreSkills couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/core-skills")
    public ResponseEntity<CoreSkills> updateCoreSkills(@RequestBody CoreSkills coreSkills) throws URISyntaxException {
        log.debug("REST request to update CoreSkills : {}", coreSkills);
        if (coreSkills.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        CoreSkills result = coreSkillsRepository.save(coreSkills);
        coreSkillsSearchRepository.save(result);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, coreSkills.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /core-skills} : get all the coreSkills.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of coreSkills in body.
     */
    @GetMapping("/core-skills")
    public List<CoreSkills> getAllCoreSkills() {
        log.debug("REST request to get all CoreSkills");
        return coreSkillsRepository.findAll();
    }

    /**
     * {@code GET  /core-skills/:id} : get the "id" coreSkills.
     *
     * @param id the id of the coreSkills to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the coreSkills, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/core-skills/{id}")
    public ResponseEntity<CoreSkills> getCoreSkills(@PathVariable Long id) {
        log.debug("REST request to get CoreSkills : {}", id);
        Optional<CoreSkills> coreSkills = coreSkillsRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(coreSkills);
    }

    /**
     * {@code DELETE  /core-skills/:id} : delete the "id" coreSkills.
     *
     * @param id the id of the coreSkills to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/core-skills/{id}")
    public ResponseEntity<Void> deleteCoreSkills(@PathVariable Long id) {
        log.debug("REST request to delete CoreSkills : {}", id);
        coreSkillsRepository.deleteById(id);
        coreSkillsSearchRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }

    /**
     * {@code SEARCH  /_search/core-skills?query=:query} : search for the coreSkills corresponding
     * to the query.
     *
     * @param query the query of the coreSkills search.
     * @return the result of the search.
     */
    @GetMapping("/_search/core-skills")
    public List<CoreSkills> searchCoreSkills(@RequestParam String query) {
        log.debug("REST request to search CoreSkills for query {}", query);
        return StreamSupport
            .stream(coreSkillsSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .collect(Collectors.toList());
    }
}
