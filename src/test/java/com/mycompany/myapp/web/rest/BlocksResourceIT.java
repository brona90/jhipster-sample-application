package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.JhipsterSampleApplicationApp;
import com.mycompany.myapp.domain.Blocks;
import com.mycompany.myapp.repository.BlocksRepository;
import com.mycompany.myapp.repository.search.BlocksSearchRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import javax.persistence.EntityManager;
import java.util.Collections;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.elasticsearch.index.query.QueryBuilders.queryStringQuery;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link BlocksResource} REST controller.
 */
@SpringBootTest(classes = JhipsterSampleApplicationApp.class)
@ExtendWith(MockitoExtension.class)
@AutoConfigureMockMvc
@WithMockUser
public class BlocksResourceIT {

    @Autowired
    private BlocksRepository blocksRepository;

    /**
     * This repository is mocked in the com.mycompany.myapp.repository.search test package.
     *
     * @see com.mycompany.myapp.repository.search.BlocksSearchRepositoryMockConfiguration
     */
    @Autowired
    private BlocksSearchRepository mockBlocksSearchRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restBlocksMockMvc;

    private Blocks blocks;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Blocks createEntity(EntityManager em) {
        Blocks blocks = new Blocks();
        return blocks;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Blocks createUpdatedEntity(EntityManager em) {
        Blocks blocks = new Blocks();
        return blocks;
    }

    @BeforeEach
    public void initTest() {
        blocks = createEntity(em);
    }

    @Test
    @Transactional
    public void createBlocks() throws Exception {
        int databaseSizeBeforeCreate = blocksRepository.findAll().size();

        // Create the Blocks
        restBlocksMockMvc.perform(post("/api/blocks")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(blocks)))
            .andExpect(status().isCreated());

        // Validate the Blocks in the database
        List<Blocks> blocksList = blocksRepository.findAll();
        assertThat(blocksList).hasSize(databaseSizeBeforeCreate + 1);
        Blocks testBlocks = blocksList.get(blocksList.size() - 1);

        // Validate the Blocks in Elasticsearch
        verify(mockBlocksSearchRepository, times(1)).save(testBlocks);
    }

    @Test
    @Transactional
    public void createBlocksWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = blocksRepository.findAll().size();

        // Create the Blocks with an existing ID
        blocks.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restBlocksMockMvc.perform(post("/api/blocks")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(blocks)))
            .andExpect(status().isBadRequest());

        // Validate the Blocks in the database
        List<Blocks> blocksList = blocksRepository.findAll();
        assertThat(blocksList).hasSize(databaseSizeBeforeCreate);

        // Validate the Blocks in Elasticsearch
        verify(mockBlocksSearchRepository, times(0)).save(blocks);
    }


    @Test
    @Transactional
    public void getAllBlocks() throws Exception {
        // Initialize the database
        blocksRepository.saveAndFlush(blocks);

        // Get all the blocksList
        restBlocksMockMvc.perform(get("/api/blocks?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(blocks.getId().intValue())));
    }
    
    @Test
    @Transactional
    public void getBlocks() throws Exception {
        // Initialize the database
        blocksRepository.saveAndFlush(blocks);

        // Get the blocks
        restBlocksMockMvc.perform(get("/api/blocks/{id}", blocks.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(blocks.getId().intValue()));
    }

    @Test
    @Transactional
    public void getNonExistingBlocks() throws Exception {
        // Get the blocks
        restBlocksMockMvc.perform(get("/api/blocks/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateBlocks() throws Exception {
        // Initialize the database
        blocksRepository.saveAndFlush(blocks);

        int databaseSizeBeforeUpdate = blocksRepository.findAll().size();

        // Update the blocks
        Blocks updatedBlocks = blocksRepository.findById(blocks.getId()).get();
        // Disconnect from session so that the updates on updatedBlocks are not directly saved in db
        em.detach(updatedBlocks);

        restBlocksMockMvc.perform(put("/api/blocks")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedBlocks)))
            .andExpect(status().isOk());

        // Validate the Blocks in the database
        List<Blocks> blocksList = blocksRepository.findAll();
        assertThat(blocksList).hasSize(databaseSizeBeforeUpdate);
        Blocks testBlocks = blocksList.get(blocksList.size() - 1);

        // Validate the Blocks in Elasticsearch
        verify(mockBlocksSearchRepository, times(1)).save(testBlocks);
    }

    @Test
    @Transactional
    public void updateNonExistingBlocks() throws Exception {
        int databaseSizeBeforeUpdate = blocksRepository.findAll().size();

        // Create the Blocks

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restBlocksMockMvc.perform(put("/api/blocks")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(blocks)))
            .andExpect(status().isBadRequest());

        // Validate the Blocks in the database
        List<Blocks> blocksList = blocksRepository.findAll();
        assertThat(blocksList).hasSize(databaseSizeBeforeUpdate);

        // Validate the Blocks in Elasticsearch
        verify(mockBlocksSearchRepository, times(0)).save(blocks);
    }

    @Test
    @Transactional
    public void deleteBlocks() throws Exception {
        // Initialize the database
        blocksRepository.saveAndFlush(blocks);

        int databaseSizeBeforeDelete = blocksRepository.findAll().size();

        // Delete the blocks
        restBlocksMockMvc.perform(delete("/api/blocks/{id}", blocks.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Blocks> blocksList = blocksRepository.findAll();
        assertThat(blocksList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the Blocks in Elasticsearch
        verify(mockBlocksSearchRepository, times(1)).deleteById(blocks.getId());
    }

    @Test
    @Transactional
    public void searchBlocks() throws Exception {
        // Initialize the database
        blocksRepository.saveAndFlush(blocks);
        when(mockBlocksSearchRepository.search(queryStringQuery("id:" + blocks.getId())))
            .thenReturn(Collections.singletonList(blocks));
        // Search the blocks
        restBlocksMockMvc.perform(get("/api/_search/blocks?query=id:" + blocks.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(blocks.getId().intValue())));
    }
}
