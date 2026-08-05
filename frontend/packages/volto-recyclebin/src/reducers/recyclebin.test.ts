import { describe, expect, it } from 'vitest';
import {
  EMPTY_RECYCLE_BIN,
  GET_RECYCLE_BIN,
  GET_RECYCLE_BIN_ITEM,
  PURGE_RECYCLE_BIN_ITEM,
  RESET_RECYCLE_BIN_OPERATION,
  RESTORE_RECYCLE_BIN_ITEM,
} from '../constants';
import recycleBin, { initialState } from './recyclebin';

describe('recycle bin reducer', () => {
  it('tracks listing and item requests', () => {
    const loading = recycleBin(initialState, {
      type: `${GET_RECYCLE_BIN}_PENDING`,
    });
    expect(loading.get).toEqual({
      loaded: false,
      loading: true,
      error: null,
    });

    const listing = { '@id': '/@recyclebin', items_total: 0, items: [] };
    const loaded = recycleBin(loading, {
      type: `${GET_RECYCLE_BIN}_SUCCESS`,
      result: listing,
    });
    expect(loaded.listing).toBe(listing);
    expect(loaded.get.loaded).toBe(true);

    const error = new Error('not found');
    const failed = recycleBin(loaded, {
      type: `${GET_RECYCLE_BIN_ITEM}_FAIL`,
      error,
    });
    expect(failed.item).toBeNull();
    expect(failed.getItem.error).toBe(error);
  });

  it.each([
    [RESTORE_RECYCLE_BIN_ITEM, 'restore'],
    [PURGE_RECYCLE_BIN_ITEM, 'purge'],
    [EMPTY_RECYCLE_BIN, 'empty'],
  ] as const)('tracks %s request lifecycle', (type, stateKey) => {
    const pending = recycleBin(initialState, { type: `${type}_PENDING` });
    expect(pending[stateKey].loading).toBe(true);

    const succeeded = recycleBin(pending, { type: `${type}_SUCCESS` });
    expect(succeeded[stateKey].loaded).toBe(true);
  });

  it('stores restore results and resets operation state', () => {
    const result = {
      status: 'success' as const,
      message: 'Restored',
      restored_item: {
        '@id': '/document',
        id: 'document',
        title: 'Document',
        '@type': 'Document',
      },
    };
    const restored = recycleBin(initialState, {
      type: `${RESTORE_RECYCLE_BIN_ITEM}_SUCCESS`,
      result,
    });
    expect(restored.restoredItem).toBe(result);

    const reset = recycleBin(restored, {
      type: RESET_RECYCLE_BIN_OPERATION,
    });
    expect(reset.restoredItem).toBeNull();
    expect(reset.restore).toEqual(initialState.restore);
  });
});
