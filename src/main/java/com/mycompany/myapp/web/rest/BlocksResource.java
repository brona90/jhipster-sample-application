package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.domain.Blocks;
import com.mycompany.myapp.repository.BlocksRepository;
import com.mycompany.myapp.repository.search.BlocksSearchRepository;
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
 * REST controller for managing {@link com.mycompany.myapp.domain.Blocks}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class BlocksResource {

    private final Logger log = LoggerFactory.getLogger(BlocksResource.class);

    private static final String ENTITY_NAME = "blocks";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final BlocksRepository blocksRepository;

    private final BlocksSearchRepository blocksSearchRepository;

    public BlocksResource(BlocksRepository blocksRepository, BlocksSearchRepository blocksSearchRepository) {
        this.blocksRepository = blocksRepository;
        this.blocksSearchRepository = blocksSearchRepository;
    }

    /**
     * {@code POST  /blocks} : Create a new blocks.
     *
     * @param blocks the blocks to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new blocks, or with status {@code 400 (Bad Request)} if the blocks has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/blocks")
    public ResponseEntity<Blocks> createBlocks(@RequestBody Blocks blocks) throws URISyntaxException {
        log.debug("REST request to save Blocks : {}", blocks);
        if (blocks.getId() != null) {
            throw new BadRequestAlertException("A new blocks cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Blocks result = blocksRepository.save(blocks);
        blocksSearchRepository.save(result);
        return ResponseEntity.created(new URI("/api/blocks/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /blocks} : Updates an existing blocks.
     *
     * @param blocks the blocks to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated blocks,
     * or with status {@code 400 (Bad Request)} if the blocks is not valid,
     * or with status {@code 500 (Internal Server Error)} if the blocks couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/blocks")
    public ResponseEntity<Blocks> updateBlocks(@RequestBody Blocks blocks) throws URISyntaxException {
        log.debug("REST request to update Blocks : {}", blocks);
        if (blocks.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Blocks result = blocksRepository.save(blocks);
        blocksSearchRepository.save(result);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, blocks.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /blocks} : get all the blocks.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of blocks in body.
     */
    @GetMapping("/blocks")
    public List<Blocks> getAllBlocks() {
        log.debug("REST request to get all Blocks");
        return blocksRepository.findAll();
    }

    /**
     * {@code GET  /blocks/:id} : get the "id" blocks.
     *
     * @param id the id of the blocks to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the blocks, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/blocks/{id}")
    public ResponseEntity<Blocks> getBlocks(@PathVariable Long id) {
        log.debug("REST request to get Blocks : {}", id);
        Optional<Blocks> blocks = blocksRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(blocks);
    }

    /**
     * {@code DELETE  /blocks/:id} : delete the "id" blocks.
     *
     * @param id the id of the blocks to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/blocks/{id}")
    public ResponseEntity<Void> deleteBlocks(@PathVariable Long id) {
        log.debug("REST request to delete Blocks : {}", id);
        blocksRepository.deleteById(id);
        blocksSearchRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }

    /**
     * {@code SEARCH  /_search/blocks?query=:query} : search for the blocks corresponding
     * to the query.
     *
     * @param query the query of the blocks search.
     * @return the result of the search.
     */
    @GetMapping("/_search/blocks")
    public List<Blocks> searchBlocks(@RequestParam String query) {
        log.debug("REST request to search Blocks for query {}", query);
        return StreamSupport
            .stream(blocksSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .collect(Collectors.toList());
    }
}
