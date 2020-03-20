import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IBlocks } from 'app/shared/model/blocks.model';
import { getEntities as getBlocks } from 'app/entities/blocks/blocks.reducer';
import { getEntity, updateEntity, createEntity, reset } from './program.reducer';
import { IProgram } from 'app/shared/model/program.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IProgramUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const ProgramUpdate = (props: IProgramUpdateProps) => {
  const [blocksId, setBlocksId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { programEntity, blocks, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/program');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getBlocks();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...programEntity,
        ...values
      };

      if (isNew) {
        props.createEntity(entity);
      } else {
        props.updateEntity(entity);
      }
    }
  };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="jhipsterSampleApplicationApp.program.home.createOrEditLabel">
            <Translate contentKey="jhipsterSampleApplicationApp.program.home.createOrEditLabel">Create or edit a Program</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : programEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="program-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="program-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="programTypeLabel" for="program-programType">
                  <Translate contentKey="jhipsterSampleApplicationApp.program.programType">Program Type</Translate>
                </Label>
                <AvInput
                  id="program-programType"
                  type="select"
                  className="form-control"
                  name="programType"
                  value={(!isNew && programEntity.programType) || 'COMPETITOR'}
                >
                  <option value="COMPETITOR">{translate('jhipsterSampleApplicationApp.ProgramType.COMPETITOR')}</option>
                  <option value="DOMINATE">{translate('jhipsterSampleApplicationApp.ProgramType.DOMINATE')}</option>
                  <option value="APPLIED_POWER">{translate('jhipsterSampleApplicationApp.ProgramType.APPLIED_POWER')}</option>
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label id="startDateLabel" for="program-startDate">
                  <Translate contentKey="jhipsterSampleApplicationApp.program.startDate">Start Date</Translate>
                </Label>
                <AvField
                  id="program-startDate"
                  type="date"
                  className="form-control"
                  name="startDate"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') }
                  }}
                />
              </AvGroup>
              <AvGroup check>
                <Label id="isActiveLabel">
                  <AvInput id="program-isActive" type="checkbox" className="form-check-input" name="isActive" />
                  <Translate contentKey="jhipsterSampleApplicationApp.program.isActive">Is Active</Translate>
                </Label>
              </AvGroup>
              <AvGroup>
                <Label for="program-blocks">
                  <Translate contentKey="jhipsterSampleApplicationApp.program.blocks">Blocks</Translate>
                </Label>
                <AvInput id="program-blocks" type="select" className="form-control" name="blocks.id">
                  <option value="" key="0" />
                  {blocks
                    ? blocks.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/program" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">
                  <Translate contentKey="entity.action.back">Back</Translate>
                </span>
              </Button>
              &nbsp;
              <Button color="primary" id="save-entity" type="submit" disabled={updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp;
                <Translate contentKey="entity.action.save">Save</Translate>
              </Button>
            </AvForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

const mapStateToProps = (storeState: IRootState) => ({
  blocks: storeState.blocks.entities,
  programEntity: storeState.program.entity,
  loading: storeState.program.loading,
  updating: storeState.program.updating,
  updateSuccess: storeState.program.updateSuccess
});

const mapDispatchToProps = {
  getBlocks,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ProgramUpdate);
