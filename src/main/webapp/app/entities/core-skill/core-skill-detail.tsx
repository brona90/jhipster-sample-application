import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './core-skill.reducer';
import { ICoreSkill } from 'app/shared/model/core-skill.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ICoreSkillDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const CoreSkillDetail = (props: ICoreSkillDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { coreSkillEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="jhipsterSampleApplicationApp.coreSkill.detail.title">CoreSkill</Translate> [<b>{coreSkillEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="coreSkillType">
              <Translate contentKey="jhipsterSampleApplicationApp.coreSkill.coreSkillType">Core Skill Type</Translate>
            </span>
          </dt>
          <dd>{coreSkillEntity.coreSkillType}</dd>
          <dt>
            <span id="ability">
              <Translate contentKey="jhipsterSampleApplicationApp.coreSkill.ability">Ability</Translate>
            </span>
          </dt>
          <dd>{coreSkillEntity.ability}</dd>
          <dt>
            <span id="perscription">
              <Translate contentKey="jhipsterSampleApplicationApp.coreSkill.perscription">Perscription</Translate>
            </span>
          </dt>
          <dd>{coreSkillEntity.perscription}</dd>
          <dt>
            <Translate contentKey="jhipsterSampleApplicationApp.coreSkill.coreSkills">Core Skills</Translate>
          </dt>
          <dd>{coreSkillEntity.coreSkills ? coreSkillEntity.coreSkills.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/core-skill" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/core-skill/${coreSkillEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ coreSkill }: IRootState) => ({
  coreSkillEntity: coreSkill.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(CoreSkillDetail);
