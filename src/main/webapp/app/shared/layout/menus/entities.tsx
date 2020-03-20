import React from 'react';
import MenuItem from 'app/shared/layout/menus/menu-item';
import { DropdownItem } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Translate, translate } from 'react-jhipster';
import { NavLink as Link } from 'react-router-dom';
import { NavDropdown } from './menu-components';

export const EntitiesMenu = props => (
  <NavDropdown
    icon="th-list"
    name={translate('global.menu.entities.main')}
    id="entity-menu"
    style={{ maxHeight: '80vh', overflow: 'auto' }}
  >
    <MenuItem icon="asterisk" to="/cross-fitter">
      <Translate contentKey="global.menu.entities.crossFitter" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/program">
      <Translate contentKey="global.menu.entities.program" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/core-skills">
      <Translate contentKey="global.menu.entities.coreSkills" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/core-skill">
      <Translate contentKey="global.menu.entities.coreSkill" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/block">
      <Translate contentKey="global.menu.entities.block" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/blocks">
      <Translate contentKey="global.menu.entities.blocks" />
    </MenuItem>
    {/* jhipster-needle-add-entity-to-menu - JHipster will add entities to the menu here */}
  </NavDropdown>
);
