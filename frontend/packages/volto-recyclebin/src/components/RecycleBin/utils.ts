import type { RecycleBinItemSummary, RecycleBinQuery } from '../../types';

export type RecycleBinSortBy =
  | 'date_desc'
  | 'date_asc'
  | 'title_asc'
  | 'title_desc'
  | 'type_asc'
  | 'type_desc'
  | 'workflow_asc'
  | 'workflow_desc';

export interface RecycleBinQueryState {
  title?: string;
  portal_type?: string;
  deleted_by?: string;
  has_subitems?: 'true' | 'false';
  language?: string;
  review_state?: string;
  date_from?: string;
  date_to?: string;
  sort_by?: RecycleBinSortBy;
  b_start?: string;
  b_size?: string;
}

export const sortMap: Record<
  RecycleBinSortBy,
  Pick<RecycleBinQuery, 'sort_on' | 'sort_order'>
> = {
  date_desc: { sort_on: 'deletion_date', sort_order: 'descending' },
  date_asc: { sort_on: 'deletion_date', sort_order: 'ascending' },
  title_asc: { sort_on: 'title', sort_order: 'ascending' },
  title_desc: { sort_on: 'title', sort_order: 'descending' },
  type_asc: { sort_on: 'portal_type', sort_order: 'ascending' },
  type_desc: { sort_on: 'portal_type', sort_order: 'descending' },
  workflow_asc: { sort_on: 'review_state', sort_order: 'ascending' },
  workflow_desc: { sort_on: 'review_state', sort_order: 'descending' },
};

const queryKeys: Array<keyof RecycleBinQueryState> = [
  'title',
  'portal_type',
  'deleted_by',
  'has_subitems',
  'language',
  'review_state',
  'date_from',
  'date_to',
  'sort_by',
  'b_start',
  'b_size',
];

export function getQueryState(search: string): RecycleBinQueryState {
  const searchParams = new URLSearchParams(search);
  return queryKeys.reduce<RecycleBinQueryState>((result, key) => {
    const value = searchParams.get(key);
    if (value) result[key] = value as never;
    return result;
  }, {});
}

export function toRecycleBinQuery(
  state: RecycleBinQueryState,
): RecycleBinQuery {
  const query: RecycleBinQuery = {
    title: state.title,
    portal_type: state.portal_type,
    deleted_by: state.deleted_by,
    language: state.language,
    review_state: state.review_state,
    date_from: state.date_from,
    date_to: state.date_to,
    b_start: state.b_start,
    b_size: state.b_size,
    ...(sortMap[state.sort_by ?? 'date_desc'] ?? sortMap.date_desc),
  };

  if (state.has_subitems === 'true') query.has_subitems = true;
  if (state.has_subitems === 'false') query.has_subitems = false;

  return Object.fromEntries(
    Object.entries(query).filter(([, value]) => value !== undefined),
  ) as RecycleBinQuery;
}

export function listingUrl(state: RecycleBinQueryState = {}) {
  const searchParams = new URLSearchParams();
  Object.entries(state).forEach(([key, value]) => {
    if (value) searchParams.set(key, value);
  });
  const queryString = searchParams.toString();
  return queryString ? `/@@recyclebin?${queryString}` : '/@@recyclebin';
}

export function removeQueryParameter(
  state: RecycleBinQueryState,
  key: keyof RecycleBinQueryState,
) {
  return listingUrl(
    Object.fromEntries(
      Object.entries(state).filter(([candidate]) => candidate !== key),
    ) as RecycleBinQueryState,
  );
}

export function getFilterOptions(
  items: RecycleBinItemSummary[],
  key: keyof Pick<
    RecycleBinItemSummary,
    '@type' | 'deleted_by' | 'language' | 'review_state'
  >,
) {
  return Array.from(
    new Set(items.map((item) => item[key]).filter(Boolean) as string[]),
  ).sort();
}

export function getBatching(
  total: number,
  bStart?: string | null,
  bSize?: string | null,
) {
  const requestedPageSize = Number(bSize ?? 25);
  const pageSize =
    Number.isFinite(requestedPageSize) && requestedPageSize > 0
      ? requestedPageSize
      : 25;
  const requestedOffset = Number(bStart ?? 0);
  const offset =
    Number.isFinite(requestedOffset) && requestedOffset >= 0
      ? requestedOffset
      : 0;

  return {
    pageSize,
    offset,
    currentPage: Math.floor(offset / pageSize),
    totalPages: Math.ceil(total / pageSize),
  };
}

export function getErrorMessage(error: any) {
  return (
    error?.response?.body?.message ||
    error?.response?.body?.error?.message ||
    error?.error?.message ||
    error?.message ||
    'Request failed'
  );
}

export async function performRecycleBinItems(
  ids: string[],
  perform: (id: string) => Promise<any>,
) {
  const failures: Array<{ id: string; message: string }> = [];
  let succeeded = 0;
  let restoredUrl: string | undefined;

  for (const id of ids) {
    try {
      const result = await perform(id);
      succeeded += 1;
      restoredUrl = result?.restored_item?.['@id'] ?? restoredUrl;
    } catch (error) {
      failures.push({ id, message: getErrorMessage(error) });
    }
  }

  return { failures, succeeded, restoredUrl };
}
