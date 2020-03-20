package com.mycompany.myapp.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.mycompany.myapp.web.rest.TestUtil;

public class CrossFitterTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(CrossFitter.class);
        CrossFitter crossFitter1 = new CrossFitter();
        crossFitter1.setId(1L);
        CrossFitter crossFitter2 = new CrossFitter();
        crossFitter2.setId(crossFitter1.getId());
        assertThat(crossFitter1).isEqualTo(crossFitter2);
        crossFitter2.setId(2L);
        assertThat(crossFitter1).isNotEqualTo(crossFitter2);
        crossFitter1.setId(null);
        assertThat(crossFitter1).isNotEqualTo(crossFitter2);
    }
}
