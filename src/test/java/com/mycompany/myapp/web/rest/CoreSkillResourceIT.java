package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.JhipsterSampleApplicationApp;
import com.mycompany.myapp.domain.CoreSkill;
import com.mycompany.myapp.repository.CoreSkillRepository;
import com.mycompany.myapp.repository.search.CoreSkillSearchRepository;

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

import com.mycompany.myapp.domain.enumeration.CoreSkillType;
/**
 * Integration tests for the {@link CoreSkillResource} REST controller.
 */
@SpringBootTest(classes = JhipsterSampleApplicationApp.class)
@ExtendWith(MockitoExtension.class)
@AutoConfigureMockMvc
@WithMockUser
public class CoreSkillResourceIT {

    private static final CoreSkillType DEFAULT_CORE_SKILL_TYPE = CoreSkillType.DOUBLE;
    private static final CoreSkillType UPDATED_CORE_SKILL_TYPE = CoreSkillType.RINGMU;

    private static final Integer DEFAULT_ABILITY = 1;
    private static final Integer UPDATED_ABILITY = 2;

    private static final String DEFAULT_PERSCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_PERSCRIPTION = "BBBBBBBBBB";

    @Autowired
    private CoreSkillRepository coreSkillRepository;

    /**
     * This repository is mocked in the com.mycompany.myapp.repository.search test package.
     *
     * @see com.mycompany.myapp.repository.search.CoreSkillSearchRepositoryMockConfiguration
     */
    @Autowired
    private CoreSkillSearchRepository mockCoreSkillSearchRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restCoreSkillMockMvc;

    private CoreSkill coreSkill;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static CoreSkill createEntity(EntityManager em) {
        CoreSkill coreSkill = new CoreSkill()
            .coreSkillType(DEFAULT_CORE_SKILL_TYPE)
            .ability(DEFAULT_ABILITY)
            .perscription(DEFAULT_PERSCRIPTION);
        return coreSkill;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static CoreSkill createUpdatedEntity(EntityManager em) {
        CoreSkill coreSkill = new CoreSkill()
            .coreSkillType(UPDATED_CORE_SKILL_TYPE)
            .ability(UPDATED_ABILITY)
            .perscription(UPDATED_PERSCRIPTION);
        return coreSkill;
    }

    @BeforeEach
    public void initTest() {
        coreSkill = createEntity(em);
    }

    @Test
    @Transactional
    public void createCoreSkill() throws Exception {
        int databaseSizeBeforeCreate = coreSkillRepository.findAll().size();

        // Create the CoreSkill
        restCoreSkillMockMvc.perform(post("/api/core-skills")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(coreSkill)))
            .andExpect(status().isCreated());

        // Validate the CoreSkill in the database
        List<CoreSkill> coreSkillList = coreSkillRepository.findAll();
        assertThat(coreSkillList).hasSize(databaseSizeBeforeCreate + 1);
        CoreSkill testCoreSkill = coreSkillList.get(coreSkillList.size() - 1);
        assertThat(testCoreSkill.getCoreSkillType()).isEqualTo(DEFAULT_CORE_SKILL_TYPE);
        assertThat(testCoreSkill.getAbility()).isEqualTo(DEFAULT_ABILITY);
        assertThat(testCoreSkill.getPerscription()).isEqualTo(DEFAULT_PERSCRIPTION);

        // Validate the CoreSkill in Elasticsearch
        verify(mockCoreSkillSearchRepository, times(1)).save(testCoreSkill);
    }

    @Test
    @Transactional
    public void createCoreSkillWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = coreSkillRepository.findAll().size();

        // Create the CoreSkill with an existing ID
        coreSkill.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restCoreSkillMockMvc.perform(post("/api/core-skills")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(coreSkill)))
            .andExpect(status().isBadRequest());

        // Validate the CoreSkill in the database
        List<CoreSkill> coreSkillList = coreSkillRepository.findAll();
        assertThat(coreSkillList).hasSize(databaseSizeBeforeCreate);

        // Validate the CoreSkill in Elasticsearch
        verify(mockCoreSkillSearchRepository, times(0)).save(coreSkill);
    }


    @Test
    @Transactional
    public void checkCoreSkillTypeIsRequired() throws Exception {
        int databaseSizeBeforeTest = coreSkillRepository.findAll().size();
        // set the field null
        coreSkill.setCoreSkillType(null);

        // Create the CoreSkill, which fails.

        restCoreSkillMockMvc.perform(post("/api/core-skills")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(coreSkill)))
            .andExpect(status().isBadRequest());

        List<CoreSkill> coreSkillList = coreSkillRepository.findAll();
        assertThat(coreSkillList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkAbilityIsRequired() throws Exception {
        int databaseSizeBeforeTest = coreSkillRepository.findAll().size();
        // set the field null
        coreSkill.setAbility(null);

        // Create the CoreSkill, which fails.

        restCoreSkillMockMvc.perform(post("/api/core-skills")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(coreSkill)))
            .andExpect(status().isBadRequest());

        List<CoreSkill> coreSkillList = coreSkillRepository.findAll();
        assertThat(coreSkillList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllCoreSkills() throws Exception {
        // Initialize the database
        coreSkillRepository.saveAndFlush(coreSkill);

        // Get all the coreSkillList
        restCoreSkillMockMvc.perform(get("/api/core-skills?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(coreSkill.getId().intValue())))
            .andExpect(jsonPath("$.[*].coreSkillType").value(hasItem(DEFAULT_CORE_SKILL_TYPE.toString())))
            .andExpect(jsonPath("$.[*].ability").value(hasItem(DEFAULT_ABILITY)))
            .andExpect(jsonPath("$.[*].perscription").value(hasItem(DEFAULT_PERSCRIPTION)));
    }
    
    @Test
    @Transactional
    public void getCoreSkill() throws Exception {
        // Initialize the database
        coreSkillRepository.saveAndFlush(coreSkill);

        // Get the coreSkill
        restCoreSkillMockMvc.perform(get("/api/core-skills/{id}", coreSkill.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(coreSkill.getId().intValue()))
            .andExpect(jsonPath("$.coreSkillType").value(DEFAULT_CORE_SKILL_TYPE.toString()))
            .andExpect(jsonPath("$.ability").value(DEFAULT_ABILITY))
            .andExpect(jsonPath("$.perscription").value(DEFAULT_PERSCRIPTION));
    }

    @Test
    @Transactional
    public void getNonExistingCoreSkill() throws Exception {
        // Get the coreSkill
        restCoreSkillMockMvc.perform(get("/api/core-skills/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateCoreSkill() throws Exception {
        // Initialize the database
        coreSkillRepository.saveAndFlush(coreSkill);

        int databaseSizeBeforeUpdate = coreSkillRepository.findAll().size();

        // Update the coreSkill
        CoreSkill updatedCoreSkill = coreSkillRepository.findById(coreSkill.getId()).get();
        // Disconnect from session so that the updates on updatedCoreSkill are not directly saved in db
        em.detach(updatedCoreSkill);
        updatedCoreSkill
            .coreSkillType(UPDATED_CORE_SKILL_TYPE)
            .ability(UPDATED_ABILITY)
            .perscription(UPDATED_PERSCRIPTION);

        restCoreSkillMockMvc.perform(put("/api/core-skills")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedCoreSkill)))
            .andExpect(status().isOk());

        // Validate the CoreSkill in the database
        List<CoreSkill> coreSkillList = coreSkillRepository.findAll();
        assertThat(coreSkillList).hasSize(databaseSizeBeforeUpdate);
        CoreSkill testCoreSkill = coreSkillList.get(coreSkillList.size() - 1);
        assertThat(testCoreSkill.getCoreSkillType()).isEqualTo(UPDATED_CORE_SKILL_TYPE);
        assertThat(testCoreSkill.getAbility()).isEqualTo(UPDATED_ABILITY);
        assertThat(testCoreSkill.getPerscription()).isEqualTo(UPDATED_PERSCRIPTION);

        // Validate the CoreSkill in Elasticsearch
        verify(mockCoreSkillSearchRepository, times(1)).save(testCoreSkill);
    }

    @Test
    @Transactional
    public void updateNonExistingCoreSkill() throws Exception {
        int databaseSizeBeforeUpdate = coreSkillRepository.findAll().size();

        // Create the CoreSkill

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCoreSkillMockMvc.perform(put("/api/core-skills")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(coreSkill)))
            .andExpect(status().isBadRequest());

        // Validate the CoreSkill in the database
        List<CoreSkill> coreSkillList = coreSkillRepository.findAll();
        assertThat(coreSkillList).hasSize(databaseSizeBeforeUpdate);

        // Validate the CoreSkill in Elasticsearch
        verify(mockCoreSkillSearchRepository, times(0)).save(coreSkill);
    }

    @Test
    @Transactional
    public void deleteCoreSkill() throws Exception {
        // Initialize the database
        coreSkillRepository.saveAndFlush(coreSkill);

        int databaseSizeBeforeDelete = coreSkillRepository.findAll().size();

        // Delete the coreSkill
        restCoreSkillMockMvc.perform(delete("/api/core-skills/{id}", coreSkill.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<CoreSkill> coreSkillList = coreSkillRepository.findAll();
        assertThat(coreSkillList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the CoreSkill in Elasticsearch
        verify(mockCoreSkillSearchRepository, times(1)).deleteById(coreSkill.getId());
    }

    @Test
    @Transactional
    public void searchCoreSkill() throws Exception {
        // Initialize the database
        coreSkillRepository.saveAndFlush(coreSkill);
        when(mockCoreSkillSearchRepository.search(queryStringQuery("id:" + coreSkill.getId())))
            .thenReturn(Collections.singletonList(coreSkill));
        // Search the coreSkill
        restCoreSkillMockMvc.perform(get("/api/_search/core-skills?query=id:" + coreSkill.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(coreSkill.getId().intValue())))
            .andExpect(jsonPath("$.[*].coreSkillType").value(hasItem(DEFAULT_CORE_SKILL_TYPE.toString())))
            .andExpect(jsonPath("$.[*].ability").value(hasItem(DEFAULT_ABILITY)))
            .andExpect(jsonPath("$.[*].perscription").value(hasItem(DEFAULT_PERSCRIPTION)));
    }
}
