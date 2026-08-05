import { describe, expect, it } from 'vitest';
import {
  formatRecycleBinDate,
  getErrorMessage,
  getFilterOptions,
  getPagination,
  getQueryState,
  listingUrl,
  performRecycleBinItems,
  removeQueryParameter,
  toRecycleBinQuery,
} from './utils';

describe('recycle bin query helpers', () => {
  it('round-trips UI query state and maps sorting for the API', () => {
    const state = getQueryState(
      '?title=News&has_subitems=false&sort_by=title_asc&b_start=25',
    );
    expect(state).toEqual({
      title: 'News',
      has_subitems: 'false',
      sort_by: 'title_asc',
      b_start: '25',
    });
    expect(toRecycleBinQuery(state)).toEqual({
      title: 'News',
      has_subitems: false,
      b_start: '25',
      sort_on: 'title',
      sort_order: 'ascending',
    });
  });

  it('creates listing links and removes one filter', () => {
    expect(listingUrl({ title: 'Old news', b_size: '10' })).toBe(
      '/@@recyclebin?title=Old+news&b_size=10',
    );
    expect(
      removeQueryParameter(
        { title: 'Old news', portal_type: 'News Item' },
        'title',
      ),
    ).toBe('/@@recyclebin?portal_type=News+Item');
  });
});

describe('recycle bin display helpers', () => {
  it('computes bounded pagination', () => {
    expect(getPagination(52, '25', '25')).toEqual({
      start: 26,
      end: 50,
      size: 25,
      previousStart: 0,
      nextStart: 50,
      hasPrevious: true,
      hasNext: true,
    });
    expect(getPagination(0)).toMatchObject({ start: 0, end: 0 });
  });

  it('extracts unique sorted filter values', () => {
    const items = [
      { '@type': 'News Item', deleted_by: 'bob' },
      { '@type': 'Document', deleted_by: 'alice' },
      { '@type': 'News Item', deleted_by: 'alice' },
    ] as any;
    expect(getFilterOptions(items, '@type')).toEqual(['Document', 'News Item']);
    expect(getFilterOptions(items, 'deleted_by')).toEqual(['alice', 'bob']);
  });

  it('formats valid dates and preserves invalid input', () => {
    expect(formatRecycleBinDate('not-a-date')).toBe('not-a-date');
    expect(formatRecycleBinDate('2026-01-02T12:30:00Z', 'en-US')).toContain(
      'Jan 2, 2026',
    );
  });

  it('extracts REST API error messages', () => {
    expect(
      getErrorMessage({ response: { body: { message: 'Cannot restore' } } }),
    ).toBe('Cannot restore');
    expect(getErrorMessage({ message: 'Network error' })).toBe('Network error');
  });

  it('handles raw Volto API responses and rejected item operations', async () => {
    const result = await performRecycleBinItems(
      ['restored', 'failed'],
      'restore',
      async (id) => {
        if (id === 'failed') {
          throw Object.assign(new Error('Restore failed'), {
            response: { body: { message: 'Destination occupied' } },
          });
        }
        return { restored_item: { '@id': '/restored-document' } };
      },
      async () => undefined,
    );

    expect(result).toEqual({
      failures: [{ id: 'failed', message: 'Destination occupied' }],
      succeeded: 1,
      restoredUrl: '/restored-document',
    });
  });
});
