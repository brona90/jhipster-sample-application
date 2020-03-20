import axios from 'axios';
import { ICrudSearchAction, ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { ICoreSkill, defaultValue } from 'app/shared/model/core-skill.model';

export const ACTION_TYPES = {
  SEARCH_CORESKILLS: 'coreSkill/SEARCH_CORESKILLS',
  FETCH_CORESKILL_LIST: 'coreSkill/FETCH_CORESKILL_LIST',
  FETCH_CORESKILL: 'coreSkill/FETCH_CORESKILL',
  CREATE_CORESKILL: 'coreSkill/CREATE_CORESKILL',
  UPDATE_CORESKILL: 'coreSkill/UPDATE_CORESKILL',
  DELETE_CORESKILL: 'coreSkill/DELETE_CORESKILL',
  RESET: 'coreSkill/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<ICoreSkill>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type CoreSkillState = Readonly<typeof initialState>;

// Reducer

export default (state: CoreSkillState = initialState, action): CoreSkillState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.SEARCH_CORESKILLS):
    case REQUEST(ACTION_TYPES.FETCH_CORESKILL_LIST):
    case REQUEST(ACTION_TYPES.FETCH_CORESKILL):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_CORESKILL):
    case REQUEST(ACTION_TYPES.UPDATE_CORESKILL):
    case REQUEST(ACTION_TYPES.DELETE_CORESKILL):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.SEARCH_CORESKILLS):
    case FAILURE(ACTION_TYPES.FETCH_CORESKILL_LIST):
    case FAILURE(ACTION_TYPES.FETCH_CORESKILL):
    case FAILURE(ACTION_TYPES.CREATE_CORESKILL):
    case FAILURE(ACTION_TYPES.UPDATE_CORESKILL):
    case FAILURE(ACTION_TYPES.DELETE_CORESKILL):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.SEARCH_CORESKILLS):
    case SUCCESS(ACTION_TYPES.FETCH_CORESKILL_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_CORESKILL):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_CORESKILL):
    case SUCCESS(ACTION_TYPES.UPDATE_CORESKILL):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_CORESKILL):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {}
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState
      };
    default:
      return state;
  }
};

const apiUrl = 'api/core-skills';
const apiSearchUrl = 'api/_search/core-skills';

// Actions

export const getSearchEntities: ICrudSearchAction<ICoreSkill> = (query, page, size, sort) => ({
  type: ACTION_TYPES.SEARCH_CORESKILLS,
  payload: axios.get<ICoreSkill>(`${apiSearchUrl}?query=${query}`)
});

export const getEntities: ICrudGetAllAction<ICoreSkill> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_CORESKILL_LIST,
  payload: axios.get<ICoreSkill>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<ICoreSkill> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_CORESKILL,
    payload: axios.get<ICoreSkill>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<ICoreSkill> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_CORESKILL,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<ICoreSkill> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_CORESKILL,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<ICoreSkill> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_CORESKILL,
    payload: axios.delete(requestUrl)
  });
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
