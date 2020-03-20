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
 * A Blocks.
 */
@Entity
@Table(name = "blocks")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@org.springframework.data.elasticsearch.annotations.Document(indexName = "blocks")
public class Blocks implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @OneToMany(mappedBy = "blocks")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Block> blocks = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Set<Block> getBlocks() {
        return blocks;
    }

    public Blocks blocks(Set<Block> blocks) {
        this.blocks = blocks;
        return this;
    }

    public Blocks addBlock(Block block) {
        this.blocks.add(block);
        block.setBlocks(this);
        return this;
    }

    public Blocks removeBlock(Block block) {
        this.blocks.remove(block);
        block.setBlocks(null);
        return this;
    }

    public void setBlocks(Set<Block> blocks) {
        this.blocks = blocks;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Blocks)) {
            return false;
        }
        return id != null && id.equals(((Blocks) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Blocks{" +
            "id=" + getId() +
            "}";
    }
}
