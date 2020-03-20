import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, InputGroup, Col, Row, Table } from 'reactstrap';
import { AvForm, AvGroup, AvInput } from 'availity-reactstrap-validation';
import { openFile, byteSize, Translate, translate, ICrudSearchAction, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getSearchEntities, getEntities } from './cross-fitter.reducer';
import { ICrossFitter } from 'app/shared/model/cross-fitter.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ICrossFitterProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const CrossFitter = (props: ICrossFitterProps) => {
  const [search, setSearch] = useState('');

  useEffect(() => {
    props.getEntities();
  }, []);

  const startSearching = () => {
    if (search) {
      props.getSearchEntities(search);
    }
  };

  const clear = () => {
    setSearch('');
    props.getEntities();
  };

  const handleSearch = event => setSearch(event.target.value);

  const { crossFitterList, match, loading } = props;
  return (
    <div>
      <h2 id="cross-fitter-heading">
        <Translate contentKey="jhipsterSampleApplicationApp.crossFitter.home.title">Cross Fitters</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="jhipsterSampleApplicationApp.crossFitter.home.createLabel">Create new Cross Fitter</Translate>
        </Link>
      </h2>
      <Row>
        <Col sm="12">
          <AvForm onSubmit={startSearching}>
            <AvGroup>
              <InputGroup>
                <AvInput
                  type="text"
                  name="search"
                  value={search}
                  onChange={handleSearch}
                  placeholder={translate('jhipsterSampleApplicationApp.crossFitter.home.search')}
                />
                <Button className="input-group-addon">
                  <FontAwesomeIcon icon="search" />
                </Button>
                <Button type="reset" className="input-group-addon" onClick={clear}>
                  <FontAwesomeIcon icon="trash" />
                </Button>
              </InputGroup>
            </AvGroup>
          </AvForm>
        </Col>
      </Row>
      <div className="table-responsive">
        {crossFitterList && crossFitterList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="jhipsterSampleApplicationApp.crossFitter.geneticSex">Genetic Sex</Translate>
                </th>
                <th>
                  <Translate contentKey="jhipsterSampleApplicationApp.crossFitter.genderID">Gender ID</Translate>
                </th>
                <th>
                  <Translate contentKey="jhipsterSampleApplicationApp.crossFitter.photo">Photo</Translate>
                </th>
                <th>
                  <Translate contentKey="jhipsterSampleApplicationApp.crossFitter.program">Program</Translate>
                </th>
                <th>
                  <Translate contentKey="jhipsterSampleApplicationApp.crossFitter.coreSkills">Core Skills</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {crossFitterList.map((crossFitter, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${crossFitter.id}`} color="link" size="sm">
                      {crossFitter.id}
                    </Button>
                  </td>
                  <td>
                    <Translate contentKey={`jhipsterSampleApplicationApp.GeneticSex.${crossFitter.geneticSex}`} />
                  </td>
                  <td>{crossFitter.genderID}</td>
                  <td>
                    {crossFitter.photo ? (
                      <div>
                        <a onClick={openFile(crossFitter.photoContentType, crossFitter.photo)}>
                          <Translate contentKey="entity.action.open">Open</Translate>
                          &nbsp;
                        </a>
                        <span>
                          {crossFitter.photoContentType}, {byteSize(crossFitter.photo)}
                        </span>
                      </div>
                    ) : null}
                  </td>
                  <td>{crossFitter.program ? <Link to={`program/${crossFitter.program.id}`}>{crossFitter.program.id}</Link> : ''}</td>
                  <td>
                    {crossFitter.coreSkills ? <Link to={`core-skills/${crossFitter.coreSkills.id}`}>{crossFitter.coreSkills.id}</Link> : ''}
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${crossFitter.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${crossFitter.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${crossFitter.id}/delete`} color="danger" size="sm">
                        <FontAwesomeIcon icon="trash" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.delete">Delete</Translate>
                        </span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && (
            <div className="alert alert-warning">
              <Translate contentKey="jhipsterSampleApplicationApp.crossFitter.home.notFound">No Cross Fitters found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ crossFitter }: IRootState) => ({
  crossFitterList: crossFitter.entities,
  loading: crossFitter.loading
});

const mapDispatchToProps = {
  getSearchEntities,
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(CrossFitter);
