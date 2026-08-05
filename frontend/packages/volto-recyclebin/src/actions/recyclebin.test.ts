import { describe, expect, it } from 'vitest';
import {
  emptyRecycleBin,
  getRecycleBin,
  getRecycleBinItem,
  purgeRecycleBinItem,
  resetRecycleBinOperation,
  restoreRecycleBinItem,
} from './recyclebin';
import {
  EMPTY_RECYCLE_BIN,
  GET_RECYCLE_BIN,
  GET_RECYCLE_BIN_ITEM,
  PURGE_RECYCLE_BIN_ITEM,
  RESET_RECYCLE_BIN_OPERATION,
  RESTORE_RECYCLE_BIN_ITEM,
} from '../constants';

describe('recycle bin actions', () => {
  it('builds listing requests with filters and batching', () => {
    expect(
      getRecycleBin({
        title: 'old news',
        has_subitems: false,
        b_start: 25,
        sort_order: 'ascending',
      }),
    ).toEqual({
      type: GET_RECYCLE_BIN,
      request: {
        op: 'get',
        path: '/@recyclebin?title=old+news&has_subitems=false&b_start=25&sort_order=ascending',
      },
    });
  });

  it('builds item and mutation requests', () => {
    expect(getRecycleBinItem('item id', { b_size: 10 })).toEqual({
      type: GET_RECYCLE_BIN_ITEM,
      request: {
        op: 'get',
        path: '/@recyclebin/item id?b_size=10',
      },
    });
    expect(
      restoreRecycleBinItem('item-id', {
        restore_id: 'child-id',
        target_path: '/destination',
      }),
    ).toEqual({
      type: RESTORE_RECYCLE_BIN_ITEM,
      request: {
        op: 'post',
        path: '/@recyclebin/item-id/restore',
        data: { restore_id: 'child-id', target_path: '/destination' },
      },
    });
    expect(purgeRecycleBinItem('item-id')).toEqual({
      type: PURGE_RECYCLE_BIN_ITEM,
      request: { op: 'del', path: '/@recyclebin/item-id' },
    });
    expect(emptyRecycleBin()).toEqual({
      type: EMPTY_RECYCLE_BIN,
      request: { op: 'del', path: '/@recyclebin' },
    });
    expect(resetRecycleBinOperation()).toEqual({
      type: RESET_RECYCLE_BIN_OPERATION,
    });
  });
});
