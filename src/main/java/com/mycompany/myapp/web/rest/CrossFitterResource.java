package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.domain.CrossFitter;
import com.mycompany.myapp.repository.CrossFitterRepository;
import com.mycompany.myapp.repository.search.CrossFitterSearchRepository;
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
 * REST controller for managing {@link com.mycompany.myapp.domain.CrossFitter}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class CrossFitterResource {

    private final Logger log = LoggerFactory.getLogger(CrossFitterResource.class);

    private static final String ENTITY_NAME = "crossFitter";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final CrossFitterRepository crossFitterRepository;

    private final CrossFitterSearchRepository crossFitterSearchRepository;

    public CrossFitterResource(CrossFitterRepository crossFitterRepository, CrossFitterSearchRepository crossFitterSearchRepository) {
        this.crossFitterRepository = crossFitterRepository;
        this.crossFitterSearchRepository = crossFitterSearchRepository;
    }

    /**
     * {@code POST  /cross-fitters} : Create a new crossFitter.
     *
     * @param crossFitter the crossFitter to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new crossFitter, or with status {@code 400 (Bad Request)} if the crossFitter has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/cross-fitters")
    public ResponseEntity<CrossFitter> createCrossFitter(@Valid @RequestBody CrossFitter crossFitter) throws URISyntaxException {
        log.debug("REST request to save CrossFitter : {}", crossFitter);
        if (crossFitter.getId() != null) {
            throw new BadRequestAlertException("A new crossFitter cannot already have an ID", ENTITY_NAME, "idexists");
        }
        CrossFitter result = crossFitterRepository.save(crossFitter);
        crossFitterSearchRepository.save(result);
        return ResponseEntity.created(new URI("/api/cross-fitters/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /cross-fitters} : Updates an existing crossFitter.
     *
     * @param crossFitter the crossFitter to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated crossFitter,
     * or with status {@code 400 (Bad Request)} if the crossFitter is not valid,
     * or with status {@code 500 (Internal Server Error)} if the crossFitter couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/cross-fitters")
    public ResponseEntity<CrossFitter> updateCrossFitter(@Valid @RequestBody CrossFitter crossFitter) throws URISyntaxException {
        log.debug("REST request to update CrossFitter : {}", crossFitter);
        if (crossFitter.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        CrossFitter result = crossFitterRepository.save(crossFitter);
        crossFitterSearchRepository.save(result);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, crossFitter.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /cross-fitters} : get all the crossFitters.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of crossFitters in body.
     */
    @GetMapping("/cross-fitters")
    public List<CrossFitter> getAllCrossFitters() {
        log.debug("REST request to get all CrossFitters");
        return crossFitterRepository.findAll();
    }

    /**
     * {@code GET  /cross-fitters/:id} : get the "id" crossFitter.
     *
     * @param id the id of the crossFitter to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the crossFitter, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/cross-fitters/{id}")
    public ResponseEntity<CrossFitter> getCrossFitter(@PathVariable Long id) {
        log.debug("REST request to get CrossFitter : {}", id);
        Optional<CrossFitter> crossFitter = crossFitterRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(crossFitter);
    }

    /**
     * {@code DELETE  /cross-fitters/:id} : delete the "id" crossFitter.
     *
     * @param id the id of the crossFitter to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/cross-fitters/{id}")
    public ResponseEntity<Void> deleteCrossFitter(@PathVariable Long id) {
        log.debug("REST request to delete CrossFitter : {}", id);
        crossFitterRepository.deleteById(id);
        crossFitterSearchRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }

    /**
     * {@code SEARCH  /_search/cross-fitters?query=:query} : search for the crossFitter corresponding
     * to the query.
     *
     * @param query the query of the crossFitter search.
     * @return the result of the search.
     */
    @GetMapping("/_search/cross-fitters")
    public List<CrossFitter> searchCrossFitters(@RequestParam String query) {
        log.debug("REST request to search CrossFitters for query {}", query);
        return StreamSupport
            .stream(crossFitterSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .collect(Collectors.toList());
    }
}
