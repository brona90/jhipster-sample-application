package com.mycompany.myapp.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.mycompany.myapp.web.rest.TestUtil;

public class BlocksTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Blocks.class);
        Blocks blocks1 = new Blocks();
        blocks1.setId(1L);
        Blocks blocks2 = new Blocks();
        blocks2.setId(blocks1.getId());
        assertThat(blocks1).isEqualTo(blocks2);
        blocks2.setId(2L);
        assertThat(blocks1).isNotEqualTo(blocks2);
        blocks1.setId(null);
        assertThat(blocks1).isNotEqualTo(blocks2);
    }
}
