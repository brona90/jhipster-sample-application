package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.JhipsterSampleApplicationApp;
import com.mycompany.myapp.domain.CrossFitter;
import com.mycompany.myapp.repository.CrossFitterRepository;
import com.mycompany.myapp.repository.search.CrossFitterSearchRepository;

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
import org.springframework.util.Base64Utils;
import javax.persistence.EntityManager;
import java.util.Collections;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.elasticsearch.index.query.QueryBuilders.queryStringQuery;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.mycompany.myapp.domain.enumeration.GeneticSex;
/**
 * Integration tests for the {@link CrossFitterResource} REST controller.
 */
@SpringBootTest(classes = JhipsterSampleApplicationApp.class)
@ExtendWith(MockitoExtension.class)
@AutoConfigureMockMvc
@WithMockUser
public class CrossFitterResourceIT {

    private static final GeneticSex DEFAULT_GENETIC_SEX = GeneticSex.MALE;
    private static final GeneticSex UPDATED_GENETIC_SEX = GeneticSex.FEMALE;

    private static final String DEFAULT_GENDER_ID = "AAAAAAAAAA";
    private static final String UPDATED_GENDER_ID = "BBBBBBBBBB";

    private static final byte[] DEFAULT_PHOTO = TestUtil.createByteArray(1, "0");
    private static final byte[] UPDATED_PHOTO = TestUtil.createByteArray(1, "1");
    private static final String DEFAULT_PHOTO_CONTENT_TYPE = "image/jpg";
    private static final String UPDATED_PHOTO_CONTENT_TYPE = "image/png";

    @Autowired
    private CrossFitterRepository crossFitterRepository;

    /**
     * This repository is mocked in the com.mycompany.myapp.repository.search test package.
     *
     * @see com.mycompany.myapp.repository.search.CrossFitterSearchRepositoryMockConfiguration
     */
    @Autowired
    private CrossFitterSearchRepository mockCrossFitterSearchRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restCrossFitterMockMvc;

    private CrossFitter crossFitter;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static CrossFitter createEntity(EntityManager em) {
        CrossFitter crossFitter = new CrossFitter()
            .geneticSex(DEFAULT_GENETIC_SEX)
            .genderID(DEFAULT_GENDER_ID)
            .photo(DEFAULT_PHOTO)
            .photoContentType(DEFAULT_PHOTO_CONTENT_TYPE);
        return crossFitter;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static CrossFitter createUpdatedEntity(EntityManager em) {
        CrossFitter crossFitter = new CrossFitter()
            .geneticSex(UPDATED_GENETIC_SEX)
            .genderID(UPDATED_GENDER_ID)
            .photo(UPDATED_PHOTO)
            .photoContentType(UPDATED_PHOTO_CONTENT_TYPE);
        return crossFitter;
    }

    @BeforeEach
    public void initTest() {
        crossFitter = createEntity(em);
    }

    @Test
    @Transactional
    public void createCrossFitter() throws Exception {
        int databaseSizeBeforeCreate = crossFitterRepository.findAll().size();

        // Create the CrossFitter
        restCrossFitterMockMvc.perform(post("/api/cross-fitters")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(crossFitter)))
            .andExpect(status().isCreated());

        // Validate the CrossFitter in the database
        List<CrossFitter> crossFitterList = crossFitterRepository.findAll();
        assertThat(crossFitterList).hasSize(databaseSizeBeforeCreate + 1);
        CrossFitter testCrossFitter = crossFitterList.get(crossFitterList.size() - 1);
        assertThat(testCrossFitter.getGeneticSex()).isEqualTo(DEFAULT_GENETIC_SEX);
        assertThat(testCrossFitter.getGenderID()).isEqualTo(DEFAULT_GENDER_ID);
        assertThat(testCrossFitter.getPhoto()).isEqualTo(DEFAULT_PHOTO);
        assertThat(testCrossFitter.getPhotoContentType()).isEqualTo(DEFAULT_PHOTO_CONTENT_TYPE);

        // Validate the CrossFitter in Elasticsearch
        verify(mockCrossFitterSearchRepository, times(1)).save(testCrossFitter);
    }

    @Test
    @Transactional
    public void createCrossFitterWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = crossFitterRepository.findAll().size();

        // Create the CrossFitter with an existing ID
        crossFitter.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restCrossFitterMockMvc.perform(post("/api/cross-fitters")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(crossFitter)))
            .andExpect(status().isBadRequest());

        // Validate the CrossFitter in the database
        List<CrossFitter> crossFitterList = crossFitterRepository.findAll();
        assertThat(crossFitterList).hasSize(databaseSizeBeforeCreate);

        // Validate the CrossFitter in Elasticsearch
        verify(mockCrossFitterSearchRepository, times(0)).save(crossFitter);
    }


    @Test
    @Transactional
    public void checkGeneticSexIsRequired() throws Exception {
        int databaseSizeBeforeTest = crossFitterRepository.findAll().size();
        // set the field null
        crossFitter.setGeneticSex(null);

        // Create the CrossFitter, which fails.

        restCrossFitterMockMvc.perform(post("/api/cross-fitters")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(crossFitter)))
            .andExpect(status().isBadRequest());

        List<CrossFitter> crossFitterList = crossFitterRepository.findAll();
        assertThat(crossFitterList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllCrossFitters() throws Exception {
        // Initialize the database
        crossFitterRepository.saveAndFlush(crossFitter);

        // Get all the crossFitterList
        restCrossFitterMockMvc.perform(get("/api/cross-fitters?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(crossFitter.getId().intValue())))
            .andExpect(jsonPath("$.[*].geneticSex").value(hasItem(DEFAULT_GENETIC_SEX.toString())))
            .andExpect(jsonPath("$.[*].genderID").value(hasItem(DEFAULT_GENDER_ID)))
            .andExpect(jsonPath("$.[*].photoContentType").value(hasItem(DEFAULT_PHOTO_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].photo").value(hasItem(Base64Utils.encodeToString(DEFAULT_PHOTO))));
    }
    
    @Test
    @Transactional
    public void getCrossFitter() throws Exception {
        // Initialize the database
        crossFitterRepository.saveAndFlush(crossFitter);

        // Get the crossFitter
        restCrossFitterMockMvc.perform(get("/api/cross-fitters/{id}", crossFitter.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(crossFitter.getId().intValue()))
            .andExpect(jsonPath("$.geneticSex").value(DEFAULT_GENETIC_SEX.toString()))
            .andExpect(jsonPath("$.genderID").value(DEFAULT_GENDER_ID))
            .andExpect(jsonPath("$.photoContentType").value(DEFAULT_PHOTO_CONTENT_TYPE))
            .andExpect(jsonPath("$.photo").value(Base64Utils.encodeToString(DEFAULT_PHOTO)));
    }

    @Test
    @Transactional
    public void getNonExistingCrossFitter() throws Exception {
        // Get the crossFitter
        restCrossFitterMockMvc.perform(get("/api/cross-fitters/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateCrossFitter() throws Exception {
        // Initialize the database
        crossFitterRepository.saveAndFlush(crossFitter);

        int databaseSizeBeforeUpdate = crossFitterRepository.findAll().size();

        // Update the crossFitter
        CrossFitter updatedCrossFitter = crossFitterRepository.findById(crossFitter.getId()).get();
        // Disconnect from session so that the updates on updatedCrossFitter are not directly saved in db
        em.detach(updatedCrossFitter);
        updatedCrossFitter
            .geneticSex(UPDATED_GENETIC_SEX)
            .genderID(UPDATED_GENDER_ID)
            .photo(UPDATED_PHOTO)
            .photoContentType(UPDATED_PHOTO_CONTENT_TYPE);

        restCrossFitterMockMvc.perform(put("/api/cross-fitters")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedCrossFitter)))
            .andExpect(status().isOk());

        // Validate the CrossFitter in the database
        List<CrossFitter> crossFitterList = crossFitterRepository.findAll();
        assertThat(crossFitterList).hasSize(databaseSizeBeforeUpdate);
        CrossFitter testCrossFitter = crossFitterList.get(crossFitterList.size() - 1);
        assertThat(testCrossFitter.getGeneticSex()).isEqualTo(UPDATED_GENETIC_SEX);
        assertThat(testCrossFitter.getGenderID()).isEqualTo(UPDATED_GENDER_ID);
        assertThat(testCrossFitter.getPhoto()).isEqualTo(UPDATED_PHOTO);
        assertThat(testCrossFitter.getPhotoContentType()).isEqualTo(UPDATED_PHOTO_CONTENT_TYPE);

        // Validate the CrossFitter in Elasticsearch
        verify(mockCrossFitterSearchRepository, times(1)).save(testCrossFitter);
    }

    @Test
    @Transactional
    public void updateNonExistingCrossFitter() throws Exception {
        int databaseSizeBeforeUpdate = crossFitterRepository.findAll().size();

        // Create the CrossFitter

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCrossFitterMockMvc.perform(put("/api/cross-fitters")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(crossFitter)))
            .andExpect(status().isBadRequest());

        // Validate the CrossFitter in the database
        List<CrossFitter> crossFitterList = crossFitterRepository.findAll();
        assertThat(crossFitterList).hasSize(databaseSizeBeforeUpdate);

        // Validate the CrossFitter in Elasticsearch
        verify(mockCrossFitterSearchRepository, times(0)).save(crossFitter);
    }

    @Test
    @Transactional
    public void deleteCrossFitter() throws Exception {
        // Initialize the database
        crossFitterRepository.saveAndFlush(crossFitter);

        int databaseSizeBeforeDelete = crossFitterRepository.findAll().size();

        // Delete the crossFitter
        restCrossFitterMockMvc.perform(delete("/api/cross-fitters/{id}", crossFitter.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<CrossFitter> crossFitterList = crossFitterRepository.findAll();
        assertThat(crossFitterList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the CrossFitter in Elasticsearch
        verify(mockCrossFitterSearchRepository, times(1)).deleteById(crossFitter.getId());
    }

    @Test
    @Transactional
    public void searchCrossFitter() throws Exception {
        // Initialize the database
        crossFitterRepository.saveAndFlush(crossFitter);
        when(mockCrossFitterSearchRepository.search(queryStringQuery("id:" + crossFitter.getId())))
            .thenReturn(Collections.singletonList(crossFitter));
        // Search the crossFitter
        restCrossFitterMockMvc.perform(get("/api/_search/cross-fitters?query=id:" + crossFitter.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(crossFitter.getId().intValue())))
            .andExpect(jsonPath("$.[*].geneticSex").value(hasItem(DEFAULT_GENETIC_SEX.toString())))
            .andExpect(jsonPath("$.[*].genderID").value(hasItem(DEFAULT_GENDER_ID)))
            .andExpect(jsonPath("$.[*].photoContentType").value(hasItem(DEFAULT_PHOTO_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].photo").value(hasItem(Base64Utils.encodeToString(DEFAULT_PHOTO))));
    }
}
