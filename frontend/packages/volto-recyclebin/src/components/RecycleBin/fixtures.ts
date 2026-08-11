import type { GetRecycleBinResponse } from '../../types';

export const recycleBinFixture: GetRecycleBinResponse = {
  '@id': '/@recyclebin',
  items_total: 2,
  batching: {},
  items: [
    {
      '@id': '/@recyclebin/first-item',
      '@type': 'Document',
      id: 'first-item',
      title: 'Archived project notes',
      path: '/archive/project-notes',
      deletion_date: '2026-01-02T12:30:00Z',
      recycle_id: 'first-item',
      deleted_by: 'editor',
      language: 'en',
      review_state: 'private',
      has_children: false,
    },
    {
      '@id': '/@recyclebin/second-item',
      '@type': 'Folder',
      id: 'second-item',
      title: 'Retired campaign',
      path: '/campaign',
      deletion_date: '2026-01-01T09:00:00Z',
      recycle_id: 'second-item',
      deleted_by: 'manager',
      language: 'en',
      review_state: 'published',
      has_children: true,
    },
  ],
};
