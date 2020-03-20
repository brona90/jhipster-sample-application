import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, openFile, byteSize } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './cross-fitter.reducer';
import { ICrossFitter } from 'app/shared/model/cross-fitter.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ICrossFitterDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const CrossFitterDetail = (props: ICrossFitterDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { crossFitterEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="jhipsterSampleApplicationApp.crossFitter.detail.title">CrossFitter</Translate> [
          <b>{crossFitterEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="geneticSex">
              <Translate contentKey="jhipsterSampleApplicationApp.crossFitter.geneticSex">Genetic Sex</Translate>
            </span>
          </dt>
          <dd>{crossFitterEntity.geneticSex}</dd>
          <dt>
            <span id="genderID">
              <Translate contentKey="jhipsterSampleApplicationApp.crossFitter.genderID">Gender ID</Translate>
            </span>
          </dt>
          <dd>{crossFitterEntity.genderID}</dd>
          <dt>
            <span id="photo">
              <Translate contentKey="jhipsterSampleApplicationApp.crossFitter.photo">Photo</Translate>
            </span>
          </dt>
          <dd>
            {crossFitterEntity.photo ? (
              <div>
                <a onClick={openFile(crossFitterEntity.photoContentType, crossFitterEntity.photo)}>
                  <Translate contentKey="entity.action.open">Open</Translate>&nbsp;
                </a>
                <span>
                  {crossFitterEntity.photoContentType}, {byteSize(crossFitterEntity.photo)}
                </span>
              </div>
            ) : null}
          </dd>
          <dt>
            <Translate contentKey="jhipsterSampleApplicationApp.crossFitter.program">Program</Translate>
          </dt>
          <dd>{crossFitterEntity.program ? crossFitterEntity.program.id : ''}</dd>
          <dt>
            <Translate contentKey="jhipsterSampleApplicationApp.crossFitter.coreSkills">Core Skills</Translate>
          </dt>
          <dd>{crossFitterEntity.coreSkills ? crossFitterEntity.coreSkills.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/cross-fitter" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/cross-fitter/${crossFitterEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ crossFitter }: IRootState) => ({
  crossFitterEntity: crossFitter.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(CrossFitterDetail);
