package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.JhipsterSampleApplicationApp;
import com.mycompany.myapp.domain.CoreSkills;
import com.mycompany.myapp.repository.CoreSkillsRepository;
import com.mycompany.myapp.repository.search.CoreSkillsSearchRepository;

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
 * Integration tests for the {@link CoreSkillsResource} REST controller.
 */
@SpringBootTest(classes = JhipsterSampleApplicationApp.class)
@ExtendWith(MockitoExtension.class)
@AutoConfigureMockMvc
@WithMockUser
public class CoreSkillsResourceIT {

    @Autowired
    private CoreSkillsRepository coreSkillsRepository;

    /**
     * This repository is mocked in the com.mycompany.myapp.repository.search test package.
     *
     * @see com.mycompany.myapp.repository.search.CoreSkillsSearchRepositoryMockConfiguration
     */
    @Autowired
    private CoreSkillsSearchRepository mockCoreSkillsSearchRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restCoreSkillsMockMvc;

    private CoreSkills coreSkills;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static CoreSkills createEntity(EntityManager em) {
        CoreSkills coreSkills = new CoreSkills();
        return coreSkills;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static CoreSkills createUpdatedEntity(EntityManager em) {
        CoreSkills coreSkills = new CoreSkills();
        return coreSkills;
    }

    @BeforeEach
    public void initTest() {
        coreSkills = createEntity(em);
    }

    @Test
    @Transactional
    public void createCoreSkills() throws Exception {
        int databaseSizeBeforeCreate = coreSkillsRepository.findAll().size();

        // Create the CoreSkills
        restCoreSkillsMockMvc.perform(post("/api/core-skills")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(coreSkills)))
            .andExpect(status().isCreated());

        // Validate the CoreSkills in the database
        List<CoreSkills> coreSkillsList = coreSkillsRepository.findAll();
        assertThat(coreSkillsList).hasSize(databaseSizeBeforeCreate + 1);
        CoreSkills testCoreSkills = coreSkillsList.get(coreSkillsList.size() - 1);

        // Validate the CoreSkills in Elasticsearch
        verify(mockCoreSkillsSearchRepository, times(1)).save(testCoreSkills);
    }

    @Test
    @Transactional
    public void createCoreSkillsWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = coreSkillsRepository.findAll().size();

        // Create the CoreSkills with an existing ID
        coreSkills.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restCoreSkillsMockMvc.perform(post("/api/core-skills")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(coreSkills)))
            .andExpect(status().isBadRequest());

        // Validate the CoreSkills in the database
        List<CoreSkills> coreSkillsList = coreSkillsRepository.findAll();
        assertThat(coreSkillsList).hasSize(databaseSizeBeforeCreate);

        // Validate the CoreSkills in Elasticsearch
        verify(mockCoreSkillsSearchRepository, times(0)).save(coreSkills);
    }


    @Test
    @Transactional
    public void getAllCoreSkills() throws Exception {
        // Initialize the database
        coreSkillsRepository.saveAndFlush(coreSkills);

        // Get all the coreSkillsList
        restCoreSkillsMockMvc.perform(get("/api/core-skills?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(coreSkills.getId().intValue())));
    }
    
    @Test
    @Transactional
    public void getCoreSkills() throws Exception {
        // Initialize the database
        coreSkillsRepository.saveAndFlush(coreSkills);

        // Get the coreSkills
        restCoreSkillsMockMvc.perform(get("/api/core-skills/{id}", coreSkills.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(coreSkills.getId().intValue()));
    }

    @Test
    @Transactional
    public void getNonExistingCoreSkills() throws Exception {
        // Get the coreSkills
        restCoreSkillsMockMvc.perform(get("/api/core-skills/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateCoreSkills() throws Exception {
        // Initialize the database
        coreSkillsRepository.saveAndFlush(coreSkills);

        int databaseSizeBeforeUpdate = coreSkillsRepository.findAll().size();

        // Update the coreSkills
        CoreSkills updatedCoreSkills = coreSkillsRepository.findById(coreSkills.getId()).get();
        // Disconnect from session so that the updates on updatedCoreSkills are not directly saved in db
        em.detach(updatedCoreSkills);

        restCoreSkillsMockMvc.perform(put("/api/core-skills")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedCoreSkills)))
            .andExpect(status().isOk());

        // Validate the CoreSkills in the database
        List<CoreSkills> coreSkillsList = coreSkillsRepository.findAll();
        assertThat(coreSkillsList).hasSize(databaseSizeBeforeUpdate);
        CoreSkills testCoreSkills = coreSkillsList.get(coreSkillsList.size() - 1);

        // Validate the CoreSkills in Elasticsearch
        verify(mockCoreSkillsSearchRepository, times(1)).save(testCoreSkills);
    }

    @Test
    @Transactional
    public void updateNonExistingCoreSkills() throws Exception {
        int databaseSizeBeforeUpdate = coreSkillsRepository.findAll().size();

        // Create the CoreSkills

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCoreSkillsMockMvc.perform(put("/api/core-skills")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(coreSkills)))
            .andExpect(status().isBadRequest());

        // Validate the CoreSkills in the database
        List<CoreSkills> coreSkillsList = coreSkillsRepository.findAll();
        assertThat(coreSkillsList).hasSize(databaseSizeBeforeUpdate);

        // Validate the CoreSkills in Elasticsearch
        verify(mockCoreSkillsSearchRepository, times(0)).save(coreSkills);
    }

    @Test
    @Transactional
    public void deleteCoreSkills() throws Exception {
        // Initialize the database
        coreSkillsRepository.saveAndFlush(coreSkills);

        int databaseSizeBeforeDelete = coreSkillsRepository.findAll().size();

        // Delete the coreSkills
        restCoreSkillsMockMvc.perform(delete("/api/core-skills/{id}", coreSkills.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<CoreSkills> coreSkillsList = coreSkillsRepository.findAll();
        assertThat(coreSkillsList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the CoreSkills in Elasticsearch
        verify(mockCoreSkillsSearchRepository, times(1)).deleteById(coreSkills.getId());
    }

    @Test
    @Transactional
    public void searchCoreSkills() throws Exception {
        // Initialize the database
        coreSkillsRepository.saveAndFlush(coreSkills);
        when(mockCoreSkillsSearchRepository.search(queryStringQuery("id:" + coreSkills.getId())))
            .thenReturn(Collections.singletonList(coreSkills));
        // Search the coreSkills
        restCoreSkillsMockMvc.perform(get("/api/_search/core-skills?query=id:" + coreSkills.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(coreSkills.getId().intValue())));
    }
}
