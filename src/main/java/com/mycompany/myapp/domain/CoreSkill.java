package com.mycompany.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import org.springframework.data.elasticsearch.annotations.FieldType;
import java.io.Serializable;
import java.util.Objects;

import com.mycompany.myapp.domain.enumeration.CoreSkillType;

/**
 * A CoreSkill.
 */
@Entity
@Table(name = "core_skill")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@org.springframework.data.elasticsearch.annotations.Document(indexName = "coreskill")
public class CoreSkill implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "core_skill_type", nullable = false)
    private CoreSkillType coreSkillType;

    @NotNull
    @Column(name = "ability", nullable = false)
    private Integer ability;

    @Column(name = "perscription")
    private String perscription;

    @ManyToOne
    @JsonIgnoreProperties("coreSkills")
    private CoreSkills coreSkills;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public CoreSkillType getCoreSkillType() {
        return coreSkillType;
    }

    public CoreSkill coreSkillType(CoreSkillType coreSkillType) {
        this.coreSkillType = coreSkillType;
        return this;
    }

    public void setCoreSkillType(CoreSkillType coreSkillType) {
        this.coreSkillType = coreSkillType;
    }

    public Integer getAbility() {
        return ability;
    }

    public CoreSkill ability(Integer ability) {
        this.ability = ability;
        return this;
    }

    public void setAbility(Integer ability) {
        this.ability = ability;
    }

    public String getPerscription() {
        return perscription;
    }

    public CoreSkill perscription(String perscription) {
        this.perscription = perscription;
        return this;
    }

    public void setPerscription(String perscription) {
        this.perscription = perscription;
    }

    public CoreSkills getCoreSkills() {
        return coreSkills;
    }

    public CoreSkill coreSkills(CoreSkills coreSkills) {
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
        if (!(o instanceof CoreSkill)) {
            return false;
        }
        return id != null && id.equals(((CoreSkill) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "CoreSkill{" +
            "id=" + getId() +
            ", coreSkillType='" + getCoreSkillType() + "'" +
            ", ability=" + getAbility() +
            ", perscription='" + getPerscription() + "'" +
            "}";
    }
}
