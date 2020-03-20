import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import CoreSkills from './core-skills';
import CoreSkillsDetail from './core-skills-detail';
import CoreSkillsUpdate from './core-skills-update';
import CoreSkillsDeleteDialog from './core-skills-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={CoreSkillsDeleteDialog} />
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={CoreSkillsUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={CoreSkillsUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={CoreSkillsDetail} />
      <ErrorBoundaryRoute path={match.url} component={CoreSkills} />
    </Switch>
  </>
);

export default Routes;
