import axios from 'axios';
import { ICrudSearchAction, ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { ICrossFitter, defaultValue } from 'app/shared/model/cross-fitter.model';

export const ACTION_TYPES = {
  SEARCH_CROSSFITTERS: 'crossFitter/SEARCH_CROSSFITTERS',
  FETCH_CROSSFITTER_LIST: 'crossFitter/FETCH_CROSSFITTER_LIST',
  FETCH_CROSSFITTER: 'crossFitter/FETCH_CROSSFITTER',
  CREATE_CROSSFITTER: 'crossFitter/CREATE_CROSSFITTER',
  UPDATE_CROSSFITTER: 'crossFitter/UPDATE_CROSSFITTER',
  DELETE_CROSSFITTER: 'crossFitter/DELETE_CROSSFITTER',
  SET_BLOB: 'crossFitter/SET_BLOB',
  RESET: 'crossFitter/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<ICrossFitter>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type CrossFitterState = Readonly<typeof initialState>;

// Reducer

export default (state: CrossFitterState = initialState, action): CrossFitterState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.SEARCH_CROSSFITTERS):
    case REQUEST(ACTION_TYPES.FETCH_CROSSFITTER_LIST):
    case REQUEST(ACTION_TYPES.FETCH_CROSSFITTER):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_CROSSFITTER):
    case REQUEST(ACTION_TYPES.UPDATE_CROSSFITTER):
    case REQUEST(ACTION_TYPES.DELETE_CROSSFITTER):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.SEARCH_CROSSFITTERS):
    case FAILURE(ACTION_TYPES.FETCH_CROSSFITTER_LIST):
    case FAILURE(ACTION_TYPES.FETCH_CROSSFITTER):
    case FAILURE(ACTION_TYPES.CREATE_CROSSFITTER):
    case FAILURE(ACTION_TYPES.UPDATE_CROSSFITTER):
    case FAILURE(ACTION_TYPES.DELETE_CROSSFITTER):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.SEARCH_CROSSFITTERS):
    case SUCCESS(ACTION_TYPES.FETCH_CROSSFITTER_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_CROSSFITTER):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_CROSSFITTER):
    case SUCCESS(ACTION_TYPES.UPDATE_CROSSFITTER):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_CROSSFITTER):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {}
      };
    case ACTION_TYPES.SET_BLOB: {
      const { name, data, contentType } = action.payload;
      return {
        ...state,
        entity: {
          ...state.entity,
          [name]: data,
          [name + 'ContentType']: contentType
        }
      };
    }
    case ACTION_TYPES.RESET:
      return {
        ...initialState
      };
    default:
      return state;
  }
};

const apiUrl = 'api/cross-fitters';
const apiSearchUrl = 'api/_search/cross-fitters';

// Actions

export const getSearchEntities: ICrudSearchAction<ICrossFitter> = (query, page, size, sort) => ({
  type: ACTION_TYPES.SEARCH_CROSSFITTERS,
  payload: axios.get<ICrossFitter>(`${apiSearchUrl}?query=${query}`)
});

export const getEntities: ICrudGetAllAction<ICrossFitter> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_CROSSFITTER_LIST,
  payload: axios.get<ICrossFitter>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<ICrossFitter> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_CROSSFITTER,
    payload: axios.get<ICrossFitter>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<ICrossFitter> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_CROSSFITTER,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<ICrossFitter> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_CROSSFITTER,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<ICrossFitter> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_CROSSFITTER,
    payload: axios.delete(requestUrl)
  });
  return result;
};

export const setBlob = (name, data, contentType?) => ({
  type: ACTION_TYPES.SET_BLOB,
  payload: {
    name,
    data,
    contentType
  }
});

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
