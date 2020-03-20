import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, setFileData, openFile, byteSize, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IProgram } from 'app/shared/model/program.model';
import { getEntities as getPrograms } from 'app/entities/program/program.reducer';
import { ICoreSkills } from 'app/shared/model/core-skills.model';
import { getEntities as getCoreSkills } from 'app/entities/core-skills/core-skills.reducer';
import { getEntity, updateEntity, createEntity, setBlob, reset } from './cross-fitter.reducer';
import { ICrossFitter } from 'app/shared/model/cross-fitter.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface ICrossFitterUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const CrossFitterUpdate = (props: ICrossFitterUpdateProps) => {
  const [programId, setProgramId] = useState('0');
  const [coreSkillsId, setCoreSkillsId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { crossFitterEntity, programs, coreSkills, loading, updating } = props;

  const { photo, photoContentType } = crossFitterEntity;

  const handleClose = () => {
    props.history.push('/cross-fitter');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getPrograms();
    props.getCoreSkills();
  }, []);

  const onBlobChange = (isAnImage, name) => event => {
    setFileData(event, (contentType, data) => props.setBlob(name, data, contentType), isAnImage);
  };

  const clearBlob = name => () => {
    props.setBlob(name, undefined, undefined);
  };

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...crossFitterEntity,
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
          <h2 id="jhipsterSampleApplicationApp.crossFitter.home.createOrEditLabel">
            <Translate contentKey="jhipsterSampleApplicationApp.crossFitter.home.createOrEditLabel">Create or edit a CrossFitter</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : crossFitterEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="cross-fitter-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="cross-fitter-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="geneticSexLabel" for="cross-fitter-geneticSex">
                  <Translate contentKey="jhipsterSampleApplicationApp.crossFitter.geneticSex">Genetic Sex</Translate>
                </Label>
                <AvInput
                  id="cross-fitter-geneticSex"
                  type="select"
                  className="form-control"
                  name="geneticSex"
                  value={(!isNew && crossFitterEntity.geneticSex) || 'MALE'}
                >
                  <option value="MALE">{translate('jhipsterSampleApplicationApp.GeneticSex.MALE')}</option>
                  <option value="FEMALE">{translate('jhipsterSampleApplicationApp.GeneticSex.FEMALE')}</option>
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label id="genderIDLabel" for="cross-fitter-genderID">
                  <Translate contentKey="jhipsterSampleApplicationApp.crossFitter.genderID">Gender ID</Translate>
                </Label>
                <AvField id="cross-fitter-genderID" type="text" name="genderID" />
              </AvGroup>
              <AvGroup>
                <AvGroup>
                  <Label id="photoLabel" for="photo">
                    <Translate contentKey="jhipsterSampleApplicationApp.crossFitter.photo">Photo</Translate>
                  </Label>
                  <br />
                  {photo ? (
                    <div>
                      <a onClick={openFile(photoContentType, photo)}>
                        <Translate contentKey="entity.action.open">Open</Translate>
                      </a>
                      <br />
                      <Row>
                        <Col md="11">
                          <span>
                            {photoContentType}, {byteSize(photo)}
                          </span>
                        </Col>
                        <Col md="1">
                          <Button color="danger" onClick={clearBlob('photo')}>
                            <FontAwesomeIcon icon="times-circle" />
                          </Button>
                        </Col>
                      </Row>
                    </div>
                  ) : null}
                  <input id="file_photo" type="file" onChange={onBlobChange(false, 'photo')} />
                  <AvInput type="hidden" name="photo" value={photo} />
                </AvGroup>
              </AvGroup>
              <AvGroup>
                <Label for="cross-fitter-program">
                  <Translate contentKey="jhipsterSampleApplicationApp.crossFitter.program">Program</Translate>
                </Label>
                <AvInput id="cross-fitter-program" type="select" className="form-control" name="program.id">
                  <option value="" key="0" />
                  {programs
                    ? programs.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="cross-fitter-coreSkills">
                  <Translate contentKey="jhipsterSampleApplicationApp.crossFitter.coreSkills">Core Skills</Translate>
                </Label>
                <AvInput id="cross-fitter-coreSkills" type="select" className="form-control" name="coreSkills.id">
                  <option value="" key="0" />
                  {coreSkills
                    ? coreSkills.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/cross-fitter" replace color="info">
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
  programs: storeState.program.entities,
  coreSkills: storeState.coreSkills.entities,
  crossFitterEntity: storeState.crossFitter.entity,
  loading: storeState.crossFitter.loading,
  updating: storeState.crossFitter.updating,
  updateSuccess: storeState.crossFitter.updateSuccess
});

const mapDispatchToProps = {
  getPrograms,
  getCoreSkills,
  getEntity,
  updateEntity,
  setBlob,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(CrossFitterUpdate);
