package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.domain.Block;
import com.mycompany.myapp.repository.BlockRepository;
import com.mycompany.myapp.repository.search.BlockSearchRepository;
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
 * REST controller for managing {@link com.mycompany.myapp.domain.Block}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class BlockResource {

    private final Logger log = LoggerFactory.getLogger(BlockResource.class);

    private static final String ENTITY_NAME = "block";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final BlockRepository blockRepository;

    private final BlockSearchRepository blockSearchRepository;

    public BlockResource(BlockRepository blockRepository, BlockSearchRepository blockSearchRepository) {
        this.blockRepository = blockRepository;
        this.blockSearchRepository = blockSearchRepository;
    }

    /**
     * {@code POST  /blocks} : Create a new block.
     *
     * @param block the block to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new block, or with status {@code 400 (Bad Request)} if the block has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/blocks")
    public ResponseEntity<Block> createBlock(@Valid @RequestBody Block block) throws URISyntaxException {
        log.debug("REST request to save Block : {}", block);
        if (block.getId() != null) {
            throw new BadRequestAlertException("A new block cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Block result = blockRepository.save(block);
        blockSearchRepository.save(result);
        return ResponseEntity.created(new URI("/api/blocks/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /blocks} : Updates an existing block.
     *
     * @param block the block to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated block,
     * or with status {@code 400 (Bad Request)} if the block is not valid,
     * or with status {@code 500 (Internal Server Error)} if the block couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/blocks")
    public ResponseEntity<Block> updateBlock(@Valid @RequestBody Block block) throws URISyntaxException {
        log.debug("REST request to update Block : {}", block);
        if (block.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Block result = blockRepository.save(block);
        blockSearchRepository.save(result);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, block.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /blocks} : get all the blocks.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of blocks in body.
     */
    @GetMapping("/blocks")
    public List<Block> getAllBlocks() {
        log.debug("REST request to get all Blocks");
        return blockRepository.findAll();
    }

    /**
     * {@code GET  /blocks/:id} : get the "id" block.
     *
     * @param id the id of the block to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the block, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/blocks/{id}")
    public ResponseEntity<Block> getBlock(@PathVariable Long id) {
        log.debug("REST request to get Block : {}", id);
        Optional<Block> block = blockRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(block);
    }

    /**
     * {@code DELETE  /blocks/:id} : delete the "id" block.
     *
     * @param id the id of the block to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/blocks/{id}")
    public ResponseEntity<Void> deleteBlock(@PathVariable Long id) {
        log.debug("REST request to delete Block : {}", id);
        blockRepository.deleteById(id);
        blockSearchRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }

    /**
     * {@code SEARCH  /_search/blocks?query=:query} : search for the block corresponding
     * to the query.
     *
     * @param query the query of the block search.
     * @return the result of the search.
     */
    @GetMapping("/_search/blocks")
    public List<Block> searchBlocks(@RequestParam String query) {
        log.debug("REST request to search Blocks for query {}", query);
        return StreamSupport
            .stream(blockSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .collect(Collectors.toList());
    }
}
