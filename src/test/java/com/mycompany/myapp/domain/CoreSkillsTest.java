package com.mycompany.myapp.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.mycompany.myapp.web.rest.TestUtil;

public class CoreSkillsTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(CoreSkills.class);
        CoreSkills coreSkills1 = new CoreSkills();
        coreSkills1.setId(1L);
        CoreSkills coreSkills2 = new CoreSkills();
        coreSkills2.setId(coreSkills1.getId());
        assertThat(coreSkills1).isEqualTo(coreSkills2);
        coreSkills2.setId(2L);
        assertThat(coreSkills1).isNotEqualTo(coreSkills2);
        coreSkills1.setId(null);
        assertThat(coreSkills1).isNotEqualTo(coreSkills2);
    }
}
