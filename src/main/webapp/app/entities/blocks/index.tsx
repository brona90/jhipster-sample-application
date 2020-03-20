import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Blocks from './blocks';
import BlocksDetail from './blocks-detail';
import BlocksUpdate from './blocks-update';
import BlocksDeleteDialog from './blocks-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={BlocksDeleteDialog} />
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={BlocksUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={BlocksUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={BlocksDetail} />
      <ErrorBoundaryRoute path={match.url} component={Blocks} />
    </Switch>
  </>
);

export default Routes;
