import { describe, expect, it } from 'vitest';
import { GET_RECYCLE_BIN, GET_RECYCLE_BIN_ITEM } from '../constants';
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
});
