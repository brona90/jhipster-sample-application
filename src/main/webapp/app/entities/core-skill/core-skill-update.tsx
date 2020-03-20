import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { ICoreSkills } from 'app/shared/model/core-skills.model';
import { getEntities as getCoreSkills } from 'app/entities/core-skills/core-skills.reducer';
import { getEntity, updateEntity, createEntity, reset } from './core-skill.reducer';
import { ICoreSkill } from 'app/shared/model/core-skill.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface ICoreSkillUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const CoreSkillUpdate = (props: ICoreSkillUpdateProps) => {
  const [coreSkillsId, setCoreSkillsId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { coreSkillEntity, coreSkills, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/core-skill');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getCoreSkills();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...coreSkillEntity,
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
          <h2 id="jhipsterSampleApplicationApp.coreSkill.home.createOrEditLabel">
            <Translate contentKey="jhipsterSampleApplicationApp.coreSkill.home.createOrEditLabel">Create or edit a CoreSkill</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : coreSkillEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="core-skill-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="core-skill-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="coreSkillTypeLabel" for="core-skill-coreSkillType">
                  <Translate contentKey="jhipsterSampleApplicationApp.coreSkill.coreSkillType">Core Skill Type</Translate>
                </Label>
                <AvInput
                  id="core-skill-coreSkillType"
                  type="select"
                  className="form-control"
                  name="coreSkillType"
                  value={(!isNew && coreSkillEntity.coreSkillType) || 'DOUBLE'}
                >
                  <option value="DOUBLE">{translate('jhipsterSampleApplicationApp.CoreSkillType.DOUBLE')}</option>
                  <option value="RINGMU">{translate('jhipsterSampleApplicationApp.CoreSkillType.RINGMU')}</option>
                  <option value="BARMU">{translate('jhipsterSampleApplicationApp.CoreSkillType.BARMU')}</option>
                  <option value="CTBPULL">{translate('jhipsterSampleApplicationApp.CoreSkillType.CTBPULL')}</option>
                  <option value="TOESTB">{translate('jhipsterSampleApplicationApp.CoreSkillType.TOESTB')}</option>
                  <option value="HSPU">{translate('jhipsterSampleApplicationApp.CoreSkillType.HSPU')}</option>
                  <option value="HSWALKS">{translate('jhipsterSampleApplicationApp.CoreSkillType.HSWALKS')}</option>
                  <option value="PISTOLS">{translate('jhipsterSampleApplicationApp.CoreSkillType.PISTOLS')}</option>
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label id="abilityLabel" for="core-skill-ability">
                  <Translate contentKey="jhipsterSampleApplicationApp.coreSkill.ability">Ability</Translate>
                </Label>
                <AvField
                  id="core-skill-ability"
                  type="string"
                  className="form-control"
                  name="ability"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                    number: { value: true, errorMessage: translate('entity.validation.number') }
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="perscriptionLabel" for="core-skill-perscription">
                  <Translate contentKey="jhipsterSampleApplicationApp.coreSkill.perscription">Perscription</Translate>
                </Label>
                <AvField id="core-skill-perscription" type="text" name="perscription" />
              </AvGroup>
              <AvGroup>
                <Label for="core-skill-coreSkills">
                  <Translate contentKey="jhipsterSampleApplicationApp.coreSkill.coreSkills">Core Skills</Translate>
                </Label>
                <AvInput id="core-skill-coreSkills" type="select" className="form-control" name="coreSkills.id">
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
              <Button tag={Link} id="cancel-save" to="/core-skill" replace color="info">
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
  coreSkills: storeState.coreSkills.entities,
  coreSkillEntity: storeState.coreSkill.entity,
  loading: storeState.coreSkill.loading,
  updating: storeState.coreSkill.updating,
  updateSuccess: storeState.coreSkill.updateSuccess
});

const mapDispatchToProps = {
  getCoreSkills,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(CoreSkillUpdate);
