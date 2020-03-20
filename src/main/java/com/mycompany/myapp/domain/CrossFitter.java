package com.mycompany.myapp.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import org.springframework.data.elasticsearch.annotations.FieldType;
import java.io.Serializable;
import java.util.Objects;

import com.mycompany.myapp.domain.enumeration.GeneticSex;

/**
 * A CrossFitter.
 */
@Entity
@Table(name = "cross_fitter")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@org.springframework.data.elasticsearch.annotations.Document(indexName = "crossfitter")
public class CrossFitter implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "genetic_sex", nullable = false)
    private GeneticSex geneticSex;

    @Column(name = "gender_id")
    private String genderID;

    @Lob
    @Column(name = "photo")
    private byte[] photo;

    @Column(name = "photo_content_type")
    private String photoContentType;

    @OneToOne
    @JoinColumn(unique = true)
    private Program program;

    @OneToOne
    @JoinColumn(unique = true)
    private CoreSkills coreSkills;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public GeneticSex getGeneticSex() {
        return geneticSex;
    }

    public CrossFitter geneticSex(GeneticSex geneticSex) {
        this.geneticSex = geneticSex;
        return this;
    }

    public void setGeneticSex(GeneticSex geneticSex) {
        this.geneticSex = geneticSex;
    }

    public String getGenderID() {
        return genderID;
    }

    public CrossFitter genderID(String genderID) {
        this.genderID = genderID;
        return this;
    }

    public void setGenderID(String genderID) {
        this.genderID = genderID;
    }

    public byte[] getPhoto() {
        return photo;
    }

    public CrossFitter photo(byte[] photo) {
        this.photo = photo;
        return this;
    }

    public void setPhoto(byte[] photo) {
        this.photo = photo;
    }

    public String getPhotoContentType() {
        return photoContentType;
    }

    public CrossFitter photoContentType(String photoContentType) {
        this.photoContentType = photoContentType;
        return this;
    }

    public void setPhotoContentType(String photoContentType) {
        this.photoContentType = photoContentType;
    }

    public Program getProgram() {
        return program;
    }

    public CrossFitter program(Program program) {
        this.program = program;
        return this;
    }

    public void setProgram(Program program) {
        this.program = program;
    }

    public CoreSkills getCoreSkills() {
        return coreSkills;
    }

    public CrossFitter coreSkills(CoreSkills coreSkills) {
        this.coreSkills = coreSkills;
        return this;
    }

    public void setCoreSkills(CoreSkills coreSkills) {
        this.coreSkills = coreSkills;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof CrossFitter)) {
            return false;
        }
        return id != null && id.equals(((CrossFitter) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "CrossFitter{" +
            "id=" + getId() +
            ", geneticSex='" + getGeneticSex() + "'" +
            ", genderID='" + getGenderID() + "'" +
            ", photo='" + getPhoto() + "'" +
            ", photoContentType='" + getPhotoContentType() + "'" +
            "}";
    }
}
