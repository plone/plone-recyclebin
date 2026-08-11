import {
  EMPTY_RECYCLE_BIN,
  GET_RECYCLE_BIN,
  GET_RECYCLE_BIN_ITEM,
  PURGE_RECYCLE_BIN_ITEM,
  RESTORE_RECYCLE_BIN_ITEM,
} from '../constants';
import type { RecycleBinQuery, RestoreRecycleBinItemData } from '../types';

function withQuery(path: string, query: RecycleBinQuery = {}) {
  const searchParams = new URLSearchParams();

  Object.entries(query).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      searchParams.set(key, String(value));
    }
  });

  const queryString = searchParams.toString();
  return queryString ? `${path}?${queryString}` : path;
}

export function getRecycleBin(query: RecycleBinQuery = {}) {
  return {
    type: GET_RECYCLE_BIN,
    request: {
      op: 'get',
      path: withQuery('/@recyclebin', query),
    },
  };
}

export function getRecycleBinItem(
  id: string,
  query: Pick<RecycleBinQuery, 'b_start' | 'b_size'> = {},
) {
  return {
    type: GET_RECYCLE_BIN_ITEM,
    request: {
      op: 'get',
      path: withQuery(`/@recyclebin/${id}`, query),
    },
  };
}

export function restoreRecycleBinItem(
  id: string,
  data: RestoreRecycleBinItemData = {},
) {
  return {
    type: RESTORE_RECYCLE_BIN_ITEM,
    request: {
      op: 'post',
      path: `/@recyclebin/${id}/restore`,
      data,
    },
  };
}

export function purgeRecycleBinItem(id: string) {
  return {
    type: PURGE_RECYCLE_BIN_ITEM,
    request: {
      op: 'del',
      path: `/@recyclebin/${id}`,
    },
  };
}

export function emptyRecycleBin() {
  return {
    type: EMPTY_RECYCLE_BIN,
    request: {
      op: 'del',
      path: '/@recyclebin',
    },
  };
}
