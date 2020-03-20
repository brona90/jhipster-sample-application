import axios from 'axios';
import { ICrudSearchAction, ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { ICoreSkills, defaultValue } from 'app/shared/model/core-skills.model';

export const ACTION_TYPES = {
  SEARCH_CORESKILLS: 'coreSkills/SEARCH_CORESKILLS',
  FETCH_CORESKILLS_LIST: 'coreSkills/FETCH_CORESKILLS_LIST',
  FETCH_CORESKILLS: 'coreSkills/FETCH_CORESKILLS',
  CREATE_CORESKILLS: 'coreSkills/CREATE_CORESKILLS',
  UPDATE_CORESKILLS: 'coreSkills/UPDATE_CORESKILLS',
  DELETE_CORESKILLS: 'coreSkills/DELETE_CORESKILLS',
  RESET: 'coreSkills/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<ICoreSkills>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type CoreSkillsState = Readonly<typeof initialState>;

// Reducer

export default (state: CoreSkillsState = initialState, action): CoreSkillsState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.SEARCH_CORESKILLS):
    case REQUEST(ACTION_TYPES.FETCH_CORESKILLS_LIST):
    case REQUEST(ACTION_TYPES.FETCH_CORESKILLS):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_CORESKILLS):
    case REQUEST(ACTION_TYPES.UPDATE_CORESKILLS):
    case REQUEST(ACTION_TYPES.DELETE_CORESKILLS):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.SEARCH_CORESKILLS):
    case FAILURE(ACTION_TYPES.FETCH_CORESKILLS_LIST):
    case FAILURE(ACTION_TYPES.FETCH_CORESKILLS):
    case FAILURE(ACTION_TYPES.CREATE_CORESKILLS):
    case FAILURE(ACTION_TYPES.UPDATE_CORESKILLS):
    case FAILURE(ACTION_TYPES.DELETE_CORESKILLS):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.SEARCH_CORESKILLS):
    case SUCCESS(ACTION_TYPES.FETCH_CORESKILLS_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_CORESKILLS):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_CORESKILLS):
    case SUCCESS(ACTION_TYPES.UPDATE_CORESKILLS):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_CORESKILLS):
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

export const getSearchEntities: ICrudSearchAction<ICoreSkills> = (query, page, size, sort) => ({
  type: ACTION_TYPES.SEARCH_CORESKILLS,
  payload: axios.get<ICoreSkills>(`${apiSearchUrl}?query=${query}`)
});

export const getEntities: ICrudGetAllAction<ICoreSkills> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_CORESKILLS_LIST,
  payload: axios.get<ICoreSkills>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<ICoreSkills> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_CORESKILLS,
    payload: axios.get<ICoreSkills>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<ICoreSkills> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_CORESKILLS,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<ICoreSkills> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_CORESKILLS,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<ICoreSkills> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_CORESKILLS,
    payload: axios.delete(requestUrl)
  });
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
