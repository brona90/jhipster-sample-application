import React from 'react';
import { Switch } from 'react-router-dom';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import CrossFitter from './cross-fitter';
import Program from './program';
import CoreSkills from './core-skills';
import CoreSkill from './core-skill';
import Block from './block';
import Blocks from './blocks';
/* jhipster-needle-add-route-import - JHipster will add routes here */

const Routes = ({ match }) => (
  <div>
    <Switch>
      {/* prettier-ignore */}
      <ErrorBoundaryRoute path={`${match.url}cross-fitter`} component={CrossFitter} />
      <ErrorBoundaryRoute path={`${match.url}program`} component={Program} />
      <ErrorBoundaryRoute path={`${match.url}core-skills`} component={CoreSkills} />
      <ErrorBoundaryRoute path={`${match.url}core-skill`} component={CoreSkill} />
      <ErrorBoundaryRoute path={`${match.url}block`} component={Block} />
      <ErrorBoundaryRoute path={`${match.url}blocks`} component={Blocks} />
      {/* jhipster-needle-add-route-path - JHipster will add routes here */}
    </Switch>
  </div>
);

export default Routes;
