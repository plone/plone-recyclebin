import {
  EMPTY_RECYCLE_BIN,
  GET_RECYCLE_BIN,
  GET_RECYCLE_BIN_ITEM,
  PURGE_RECYCLE_BIN_ITEM,
  RESET_RECYCLE_BIN_OPERATION,
  RESTORE_RECYCLE_BIN_ITEM,
} from '../constants';
import type {
  GetRecycleBinItemResponse,
  GetRecycleBinResponse,
  RequestState,
  RestoreRecycleBinItemResponse,
} from '../types';

const initialRequest: RequestState = {
  loaded: false,
  loading: false,
  error: null,
};

export interface RecycleBinState {
  listing: GetRecycleBinResponse | null;
  item: GetRecycleBinItemResponse | null;
  restoredItem: RestoreRecycleBinItemResponse | null;
  get: RequestState;
  getItem: RequestState;
  restore: RequestState;
  purge: RequestState;
  empty: RequestState;
}

export const initialState: RecycleBinState = {
  listing: null,
  item: null,
  restoredItem: null,
  get: initialRequest,
  getItem: initialRequest,
  restore: initialRequest,
  purge: initialRequest,
  empty: initialRequest,
};

const pending = (): RequestState => ({
  loaded: false,
  loading: true,
  error: null,
});

const success = (): RequestState => ({
  loaded: true,
  loading: false,
  error: null,
});

const failure = (error: unknown): RequestState => ({
  loaded: false,
  loading: false,
  error,
});

export default function recycleBin(
  state: RecycleBinState = initialState,
  action: { type?: string; result?: any; error?: unknown } = {},
): RecycleBinState {
  switch (action.type) {
    case `${GET_RECYCLE_BIN}_PENDING`:
      return { ...state, get: pending() };
    case `${GET_RECYCLE_BIN}_SUCCESS`:
      return { ...state, listing: action.result, get: success() };
    case `${GET_RECYCLE_BIN}_FAIL`:
      return { ...state, listing: null, get: failure(action.error) };

    case `${GET_RECYCLE_BIN_ITEM}_PENDING`:
      return { ...state, getItem: pending() };
    case `${GET_RECYCLE_BIN_ITEM}_SUCCESS`:
      return { ...state, item: action.result, getItem: success() };
    case `${GET_RECYCLE_BIN_ITEM}_FAIL`:
      return { ...state, item: null, getItem: failure(action.error) };

    case `${RESTORE_RECYCLE_BIN_ITEM}_PENDING`:
      return { ...state, restoredItem: null, restore: pending() };
    case `${RESTORE_RECYCLE_BIN_ITEM}_SUCCESS`:
      return { ...state, restoredItem: action.result, restore: success() };
    case `${RESTORE_RECYCLE_BIN_ITEM}_FAIL`:
      return { ...state, restoredItem: null, restore: failure(action.error) };

    case `${PURGE_RECYCLE_BIN_ITEM}_PENDING`:
      return { ...state, purge: pending() };
    case `${PURGE_RECYCLE_BIN_ITEM}_SUCCESS`:
      return { ...state, purge: success() };
    case `${PURGE_RECYCLE_BIN_ITEM}_FAIL`:
      return { ...state, purge: failure(action.error) };

    case `${EMPTY_RECYCLE_BIN}_PENDING`:
      return { ...state, empty: pending() };
    case `${EMPTY_RECYCLE_BIN}_SUCCESS`:
      return { ...state, empty: success() };
    case `${EMPTY_RECYCLE_BIN}_FAIL`:
      return { ...state, empty: failure(action.error) };

    case RESET_RECYCLE_BIN_OPERATION:
      return {
        ...state,
        restoredItem: null,
        restore: initialRequest,
        purge: initialRequest,
        empty: initialRequest,
      };
    default:
      return state;
  }
}
