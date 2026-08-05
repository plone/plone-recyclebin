import { defineMessages } from 'react-intl';

export default defineMessages({
  title: { id: 'Recycle bin', defaultMessage: 'Recycle bin' },
  description: {
    id: 'Recycle bin description',
    defaultMessage:
      'Items deleted from this site are stored here and can be restored or permanently deleted.',
  },
  search: { id: 'Search deleted items', defaultMessage: 'Search' },
  sort: { id: 'Sort deleted items', defaultMessage: 'Sort by' },
  pageSize: { id: 'Recycle bin page size', defaultMessage: 'Items per page' },
  advanced: {
    id: 'Advanced recycle bin filters',
    defaultMessage: 'Advanced filters',
  },
  type: { id: 'Deleted item type', defaultMessage: 'Type' },
  deletedBy: { id: 'Deleted by', defaultMessage: 'Deleted by' },
  containsItems: { id: 'Contains items', defaultMessage: 'Contains items' },
  language: { id: 'Deleted item language', defaultMessage: 'Language' },
  workflowState: { id: 'Workflow state', defaultMessage: 'Workflow state' },
  dateFrom: { id: 'Deleted date from', defaultMessage: 'Deleted from' },
  dateTo: { id: 'Deleted date to', defaultMessage: 'Deleted to' },
  any: { id: 'Any recycle bin filter value', defaultMessage: 'Any' },
  withSubitems: {
    id: 'With contained items',
    defaultMessage: 'With contained items',
  },
  withoutSubitems: {
    id: 'Without contained items',
    defaultMessage: 'Without contained items',
  },
  applyFilters: {
    id: 'Apply recycle bin filters',
    defaultMessage: 'Apply filters',
  },
  clearAll: {
    id: 'Clear recycle bin filters',
    defaultMessage: 'Clear all filters',
  },
  selectAll: {
    id: 'Select all deleted items',
    defaultMessage: 'Select all deleted items',
  },
  selectItem: { id: 'Select deleted item', defaultMessage: 'Select {title}' },
  itemTitle: { id: 'Deleted item title', defaultMessage: 'Title' },
  path: { id: 'Original path', defaultMessage: 'Original path' },
  deletionDate: { id: 'Deletion date', defaultMessage: 'Deletion date' },
  hasChildren: {
    id: 'Contains deleted items',
    defaultMessage: 'Contains items',
  },
  restoreSelected: {
    id: 'Restore selected items',
    defaultMessage: 'Restore selected',
  },
  deleteSelected: {
    id: 'Delete selected items permanently',
    defaultMessage: 'Delete selected',
  },
  empty: { id: 'Empty recycle bin', defaultMessage: 'Empty recycle bin' },
  confirmDeleteSelected: {
    id: 'Confirm delete selected items',
    defaultMessage:
      'Permanently delete the selected items? This cannot be undone.',
  },
  confirmDelete: {
    id: 'Confirm permanent deletion',
    defaultMessage: 'Permanently delete this item? This cannot be undone.',
  },
  confirmEmpty: {
    id: 'Confirm empty recycle bin',
    defaultMessage:
      'Permanently delete every item in the recycle bin? This cannot be undone.',
  },
  noItems: {
    id: 'Recycle bin is empty',
    defaultMessage: 'The recycle bin is empty.',
  },
  noMatches: {
    id: 'No deleted items match',
    defaultMessage: 'No items match the current filters.',
  },
  resultRange: {
    id: 'Recycle bin result range',
    defaultMessage: 'Showing {start}–{end} of {total}',
  },
  previous: { id: 'Previous recycle bin page', defaultMessage: 'Previous' },
  next: { id: 'Next recycle bin page', defaultMessage: 'Next' },
  back: { id: 'Back to recycle bin', defaultMessage: 'Back to recycle bin' },
  details: {
    id: 'Deleted item details',
    defaultMessage: 'Deleted item details',
  },
  restoreTo: { id: 'Restore item to', defaultMessage: 'Restore to' },
  targetPath: { id: 'Restore target path', defaultMessage: 'Target path' },
  targetPathHelp: {
    id: 'Restore target path help',
    defaultMessage:
      'Leave unchanged to restore to the original parent, or enter another portal-relative path.',
  },
  restore: { id: 'Restore deleted item', defaultMessage: 'Restore' },
  permanentlyDelete: {
    id: 'Permanently delete item',
    defaultMessage: 'Permanently delete',
  },
  children: {
    id: 'Contained deleted items',
    defaultMessage: 'Contained items ({count})',
  },
  childrenCount: { id: 'Nested item count', defaultMessage: 'Nested items' },
  childTargetPath: {
    id: 'Child restore target path',
    defaultMessage: 'Target path for {title}',
  },
  loading: {
    id: 'Loading recycle bin',
    defaultMessage: 'Loading recycle bin…',
  },
  unavailableTitle: {
    id: 'Recycle bin unavailable',
    defaultMessage: 'Recycle bin unavailable',
  },
  unavailableDescription: {
    id: 'Recycle bin unavailable description',
    defaultMessage:
      'The recycle bin is unavailable, or you do not have permission to access it.',
  },
  itemNotFoundTitle: {
    id: 'Deleted item not found',
    defaultMessage: 'Item not found',
  },
  itemNotFoundDescription: {
    id: 'Deleted item not found description',
    defaultMessage:
      'This item may already have been restored or permanently deleted.',
  },
  operationSucceeded: {
    id: 'Recycle bin operation succeeded',
    defaultMessage: 'Operation completed successfully.',
  },
  partialFailure: {
    id: 'Recycle bin partial failure',
    defaultMessage: '{succeeded} succeeded and {failed} failed.',
  },
  dateDesc: {
    id: 'Newest deletion first',
    defaultMessage: 'Deletion date, newest first',
  },
  dateAsc: {
    id: 'Oldest deletion first',
    defaultMessage: 'Deletion date, oldest first',
  },
  titleAsc: {
    id: 'Deleted item title ascending',
    defaultMessage: 'Title, A–Z',
  },
  titleDesc: {
    id: 'Deleted item title descending',
    defaultMessage: 'Title, Z–A',
  },
  typeAsc: { id: 'Deleted item type ascending', defaultMessage: 'Type, A–Z' },
  typeDesc: { id: 'Deleted item type descending', defaultMessage: 'Type, Z–A' },
  workflowAsc: {
    id: 'Workflow state ascending',
    defaultMessage: 'Workflow state, A–Z',
  },
  workflowDesc: {
    id: 'Workflow state descending',
    defaultMessage: 'Workflow state, Z–A',
  },
});
