package com.mycompany.myapp.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import org.springframework.data.elasticsearch.annotations.FieldType;
import java.io.Serializable;
import java.util.Objects;
import java.util.HashSet;
import java.util.Set;

/**
 * A CoreSkills.
 */
@Entity
@Table(name = "core_skills")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@org.springframework.data.elasticsearch.annotations.Document(indexName = "coreskills")
public class CoreSkills implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @OneToMany(mappedBy = "coreSkills")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<CoreSkill> coreSkills = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Set<CoreSkill> getCoreSkills() {
        return coreSkills;
    }

    public CoreSkills coreSkills(Set<CoreSkill> coreSkills) {
        this.coreSkills = coreSkills;
        return this;
    }

    public CoreSkills addCoreSkill(CoreSkill coreSkill) {
        this.coreSkills.add(coreSkill);
        coreSkill.setCoreSkills(this);
        return this;
    }

    public CoreSkills removeCoreSkill(CoreSkill coreSkill) {
        this.coreSkills.remove(coreSkill);
        coreSkill.setCoreSkills(null);
        return this;
    }

    public void setCoreSkills(Set<CoreSkill> coreSkills) {
        this.coreSkills = coreSkills;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof CoreSkills)) {
            return false;
        }
        return id != null && id.equals(((CoreSkills) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "CoreSkills{" +
            "id=" + getId() +
            "}";
    }
}
