import { GET_RECYCLE_BIN, GET_RECYCLE_BIN_ITEM } from '../constants';
import type {
  GetRecycleBinItemResponse,
  GetRecycleBinResponse,
  RequestState,
} from '../types';

const initialRequest: RequestState = {
  loaded: false,
  loading: false,
  error: null,
};

export interface RecycleBinState {
  listing: GetRecycleBinResponse | null;
  item: GetRecycleBinItemResponse | null;
  get: RequestState;
  getItem: RequestState;
}

export const initialState: RecycleBinState = {
  listing: null,
  item: null,
  get: initialRequest,
  getItem: initialRequest,
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

    default:
      return state;
  }
}
