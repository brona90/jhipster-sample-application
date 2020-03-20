import axios from 'axios';
import { ICrudSearchAction, ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IBlocks, defaultValue } from 'app/shared/model/blocks.model';

export const ACTION_TYPES = {
  SEARCH_BLOCKS: 'blocks/SEARCH_BLOCKS',
  FETCH_BLOCKS_LIST: 'blocks/FETCH_BLOCKS_LIST',
  FETCH_BLOCKS: 'blocks/FETCH_BLOCKS',
  CREATE_BLOCKS: 'blocks/CREATE_BLOCKS',
  UPDATE_BLOCKS: 'blocks/UPDATE_BLOCKS',
  DELETE_BLOCKS: 'blocks/DELETE_BLOCKS',
  RESET: 'blocks/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IBlocks>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type BlocksState = Readonly<typeof initialState>;

// Reducer

export default (state: BlocksState = initialState, action): BlocksState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.SEARCH_BLOCKS):
    case REQUEST(ACTION_TYPES.FETCH_BLOCKS_LIST):
    case REQUEST(ACTION_TYPES.FETCH_BLOCKS):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_BLOCKS):
    case REQUEST(ACTION_TYPES.UPDATE_BLOCKS):
    case REQUEST(ACTION_TYPES.DELETE_BLOCKS):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.SEARCH_BLOCKS):
    case FAILURE(ACTION_TYPES.FETCH_BLOCKS_LIST):
    case FAILURE(ACTION_TYPES.FETCH_BLOCKS):
    case FAILURE(ACTION_TYPES.CREATE_BLOCKS):
    case FAILURE(ACTION_TYPES.UPDATE_BLOCKS):
    case FAILURE(ACTION_TYPES.DELETE_BLOCKS):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.SEARCH_BLOCKS):
    case SUCCESS(ACTION_TYPES.FETCH_BLOCKS_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_BLOCKS):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_BLOCKS):
    case SUCCESS(ACTION_TYPES.UPDATE_BLOCKS):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_BLOCKS):
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

const apiUrl = 'api/blocks';
const apiSearchUrl = 'api/_search/blocks';

// Actions

export const getSearchEntities: ICrudSearchAction<IBlocks> = (query, page, size, sort) => ({
  type: ACTION_TYPES.SEARCH_BLOCKS,
  payload: axios.get<IBlocks>(`${apiSearchUrl}?query=${query}`)
});

export const getEntities: ICrudGetAllAction<IBlocks> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_BLOCKS_LIST,
  payload: axios.get<IBlocks>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IBlocks> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_BLOCKS,
    payload: axios.get<IBlocks>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IBlocks> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_BLOCKS,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IBlocks> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_BLOCKS,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IBlocks> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_BLOCKS,
    payload: axios.delete(requestUrl)
  });
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
