import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './block.reducer';
import { IBlock } from 'app/shared/model/block.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IBlockDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const BlockDetail = (props: IBlockDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { blockEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="jhipsterSampleApplicationApp.block.detail.title">Block</Translate> [<b>{blockEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="isInProgram">
              <Translate contentKey="jhipsterSampleApplicationApp.block.isInProgram">Is In Program</Translate>
            </span>
          </dt>
          <dd>{blockEntity.isInProgram ? 'true' : 'false'}</dd>
          <dt>
            <span id="name">
              <Translate contentKey="jhipsterSampleApplicationApp.block.name">Name</Translate>
            </span>
          </dt>
          <dd>{blockEntity.name}</dd>
          <dt>
            <Translate contentKey="jhipsterSampleApplicationApp.block.blocks">Blocks</Translate>
          </dt>
          <dd>{blockEntity.blocks ? blockEntity.blocks.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/block" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/block/${blockEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ block }: IRootState) => ({
  blockEntity: block.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(BlockDetail);
