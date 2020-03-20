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
import { getEntity, updateEntity, createEntity, reset } from './block.reducer';
import { IBlock } from 'app/shared/model/block.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IBlockUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const BlockUpdate = (props: IBlockUpdateProps) => {
  const [blocksId, setBlocksId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { blockEntity, blocks, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/block');
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
        ...blockEntity,
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
          <h2 id="jhipsterSampleApplicationApp.block.home.createOrEditLabel">
            <Translate contentKey="jhipsterSampleApplicationApp.block.home.createOrEditLabel">Create or edit a Block</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : blockEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="block-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="block-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup check>
                <Label id="isInProgramLabel">
                  <AvInput id="block-isInProgram" type="checkbox" className="form-check-input" name="isInProgram" />
                  <Translate contentKey="jhipsterSampleApplicationApp.block.isInProgram">Is In Program</Translate>
                </Label>
              </AvGroup>
              <AvGroup>
                <Label id="nameLabel" for="block-name">
                  <Translate contentKey="jhipsterSampleApplicationApp.block.name">Name</Translate>
                </Label>
                <AvField id="block-name" type="text" name="name" />
              </AvGroup>
              <AvGroup>
                <Label for="block-blocks">
                  <Translate contentKey="jhipsterSampleApplicationApp.block.blocks">Blocks</Translate>
                </Label>
                <AvInput id="block-blocks" type="select" className="form-control" name="blocks.id">
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
              <Button tag={Link} id="cancel-save" to="/block" replace color="info">
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
  blockEntity: storeState.block.entity,
  loading: storeState.block.loading,
  updating: storeState.block.updating,
  updateSuccess: storeState.block.updateSuccess
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

export default connect(mapStateToProps, mapDispatchToProps)(BlockUpdate);
