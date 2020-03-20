package com.mycompany.myapp.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.mycompany.myapp.web.rest.TestUtil;

public class CoreSkillTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(CoreSkill.class);
        CoreSkill coreSkill1 = new CoreSkill();
        coreSkill1.setId(1L);
        CoreSkill coreSkill2 = new CoreSkill();
        coreSkill2.setId(coreSkill1.getId());
        assertThat(coreSkill1).isEqualTo(coreSkill2);
        coreSkill2.setId(2L);
        assertThat(coreSkill1).isNotEqualTo(coreSkill2);
        coreSkill1.setId(null);
        assertThat(coreSkill1).isNotEqualTo(coreSkill2);
    }
}
