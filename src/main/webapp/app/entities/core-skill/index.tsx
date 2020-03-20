import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import CoreSkill from './core-skill';
import CoreSkillDetail from './core-skill-detail';
import CoreSkillUpdate from './core-skill-update';
import CoreSkillDeleteDialog from './core-skill-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={CoreSkillDeleteDialog} />
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={CoreSkillUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={CoreSkillUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={CoreSkillDetail} />
      <ErrorBoundaryRoute path={match.url} component={CoreSkill} />
    </Switch>
  </>
);

export default Routes;
