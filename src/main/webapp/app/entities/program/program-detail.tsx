import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './program.reducer';
import { IProgram } from 'app/shared/model/program.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IProgramDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const ProgramDetail = (props: IProgramDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { programEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="jhipsterSampleApplicationApp.program.detail.title">Program</Translate> [<b>{programEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="programType">
              <Translate contentKey="jhipsterSampleApplicationApp.program.programType">Program Type</Translate>
            </span>
          </dt>
          <dd>{programEntity.programType}</dd>
          <dt>
            <span id="startDate">
              <Translate contentKey="jhipsterSampleApplicationApp.program.startDate">Start Date</Translate>
            </span>
          </dt>
          <dd>
            <TextFormat value={programEntity.startDate} type="date" format={APP_LOCAL_DATE_FORMAT} />
          </dd>
          <dt>
            <span id="isActive">
              <Translate contentKey="jhipsterSampleApplicationApp.program.isActive">Is Active</Translate>
            </span>
          </dt>
          <dd>{programEntity.isActive ? 'true' : 'false'}</dd>
          <dt>
            <Translate contentKey="jhipsterSampleApplicationApp.program.blocks">Blocks</Translate>
          </dt>
          <dd>{programEntity.blocks ? programEntity.blocks.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/program" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/program/${programEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ program }: IRootState) => ({
  programEntity: program.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ProgramDetail);
