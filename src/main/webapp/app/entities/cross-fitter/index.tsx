import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import CrossFitter from './cross-fitter';
import CrossFitterDetail from './cross-fitter-detail';
import CrossFitterUpdate from './cross-fitter-update';
import CrossFitterDeleteDialog from './cross-fitter-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={CrossFitterDeleteDialog} />
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={CrossFitterUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={CrossFitterUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={CrossFitterDetail} />
      <ErrorBoundaryRoute path={match.url} component={CrossFitter} />
    </Switch>
  </>
);

export default Routes;
