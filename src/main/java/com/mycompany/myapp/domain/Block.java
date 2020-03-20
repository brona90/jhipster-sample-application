package com.mycompany.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import org.springframework.data.elasticsearch.annotations.FieldType;
import java.io.Serializable;
import java.util.Objects;

/**
 * A Block.
 */
@Entity
@Table(name = "block")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@org.springframework.data.elasticsearch.annotations.Document(indexName = "block")
public class Block implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "is_in_program", nullable = false)
    private Boolean isInProgram;

    @Column(name = "name")
    private String name;

    @ManyToOne
    @JsonIgnoreProperties("blocks")
    private Blocks blocks;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Boolean isIsInProgram() {
        return isInProgram;
    }

    public Block isInProgram(Boolean isInProgram) {
        this.isInProgram = isInProgram;
        return this;
    }

    public void setIsInProgram(Boolean isInProgram) {
        this.isInProgram = isInProgram;
    }

    public String getName() {
        return name;
    }

    public Block name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Blocks getBlocks() {
        return blocks;
    }

    public Block blocks(Blocks blocks) {
        this.blocks = blocks;
        return this;
    }

    public void setBlocks(Blocks blocks) {
        this.blocks = blocks;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Block)) {
            return false;
        }
        return id != null && id.equals(((Block) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Block{" +
            "id=" + getId() +
            ", isInProgram='" + isIsInProgram() + "'" +
            ", name='" + getName() + "'" +
            "}";
    }
}
