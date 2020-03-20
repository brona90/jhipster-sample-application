package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.domain.CoreSkill;
import com.mycompany.myapp.repository.CoreSkillRepository;
import com.mycompany.myapp.repository.search.CoreSkillSearchRepository;
import com.mycompany.myapp.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * REST controller for managing {@link com.mycompany.myapp.domain.CoreSkill}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class CoreSkillResource {

    private final Logger log = LoggerFactory.getLogger(CoreSkillResource.class);

    private static final String ENTITY_NAME = "coreSkill";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final CoreSkillRepository coreSkillRepository;

    private final CoreSkillSearchRepository coreSkillSearchRepository;

    public CoreSkillResource(CoreSkillRepository coreSkillRepository, CoreSkillSearchRepository coreSkillSearchRepository) {
        this.coreSkillRepository = coreSkillRepository;
        this.coreSkillSearchRepository = coreSkillSearchRepository;
    }

    /**
     * {@code POST  /core-skills} : Create a new coreSkill.
     *
     * @param coreSkill the coreSkill to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new coreSkill, or with status {@code 400 (Bad Request)} if the coreSkill has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/core-skills")
    public ResponseEntity<CoreSkill> createCoreSkill(@Valid @RequestBody CoreSkill coreSkill) throws URISyntaxException {
        log.debug("REST request to save CoreSkill : {}", coreSkill);
        if (coreSkill.getId() != null) {
            throw new BadRequestAlertException("A new coreSkill cannot already have an ID", ENTITY_NAME, "idexists");
        }
        CoreSkill result = coreSkillRepository.save(coreSkill);
        coreSkillSearchRepository.save(result);
        return ResponseEntity.created(new URI("/api/core-skills/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /core-skills} : Updates an existing coreSkill.
     *
     * @param coreSkill the coreSkill to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated coreSkill,
     * or with status {@code 400 (Bad Request)} if the coreSkill is not valid,
     * or with status {@code 500 (Internal Server Error)} if the coreSkill couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/core-skills")
    public ResponseEntity<CoreSkill> updateCoreSkill(@Valid @RequestBody CoreSkill coreSkill) throws URISyntaxException {
        log.debug("REST request to update CoreSkill : {}", coreSkill);
        if (coreSkill.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        CoreSkill result = coreSkillRepository.save(coreSkill);
        coreSkillSearchRepository.save(result);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, coreSkill.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /core-skills} : get all the coreSkills.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of coreSkills in body.
     */
    @GetMapping("/core-skills")
    public List<CoreSkill> getAllCoreSkills() {
        log.debug("REST request to get all CoreSkills");
        return coreSkillRepository.findAll();
    }

    /**
     * {@code GET  /core-skills/:id} : get the "id" coreSkill.
     *
     * @param id the id of the coreSkill to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the coreSkill, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/core-skills/{id}")
    public ResponseEntity<CoreSkill> getCoreSkill(@PathVariable Long id) {
        log.debug("REST request to get CoreSkill : {}", id);
        Optional<CoreSkill> coreSkill = coreSkillRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(coreSkill);
    }

    /**
     * {@code DELETE  /core-skills/:id} : delete the "id" coreSkill.
     *
     * @param id the id of the coreSkill to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/core-skills/{id}")
    public ResponseEntity<Void> deleteCoreSkill(@PathVariable Long id) {
        log.debug("REST request to delete CoreSkill : {}", id);
        coreSkillRepository.deleteById(id);
        coreSkillSearchRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }

    /**
     * {@code SEARCH  /_search/core-skills?query=:query} : search for the coreSkill corresponding
     * to the query.
     *
     * @param query the query of the coreSkill search.
     * @return the result of the search.
     */
    @GetMapping("/_search/core-skills")
    public List<CoreSkill> searchCoreSkills(@RequestParam String query) {
        log.debug("REST request to search CoreSkills for query {}", query);
        return StreamSupport
            .stream(coreSkillSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .collect(Collectors.toList());
    }
}
