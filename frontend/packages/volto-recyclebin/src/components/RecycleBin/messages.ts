import { defineMessages } from 'react-intl';

export default defineMessages({
  title: { id: 'recyclebin.title', defaultMessage: 'Recycle bin' },
  description: {
    id: 'recyclebin.description',
    defaultMessage:
      'Items deleted from this site are stored here and can be restored or permanently deleted.',
  },
  search: { id: 'recyclebin.field.search', defaultMessage: 'Search' },
  sort: { id: 'recyclebin.field.sort', defaultMessage: 'Sort by' },
  pageSize: {
    id: 'recyclebin.field.page_size',
    defaultMessage: 'Items per page',
  },
  advanced: {
    id: 'recyclebin.filter.advanced',
    defaultMessage: 'Advanced filters',
  },
  type: { id: 'recyclebin.field.type', defaultMessage: 'Type' },
  deletedBy: {
    id: 'recyclebin.field.deleted_by',
    defaultMessage: 'Deleted by',
  },
  containsItems: {
    id: 'recyclebin.field.contains_items',
    defaultMessage: 'Contains items',
  },
  language: { id: 'recyclebin.field.language', defaultMessage: 'Language' },
  workflowState: {
    id: 'recyclebin.field.workflow_state',
    defaultMessage: 'Workflow state',
  },
  dateFrom: {
    id: 'recyclebin.field.date_from',
    defaultMessage: 'Deleted from',
  },
  dateTo: { id: 'recyclebin.field.date_to', defaultMessage: 'Deleted to' },
  any: { id: 'recyclebin.filter.any', defaultMessage: 'Any' },
  withSubitems: {
    id: 'recyclebin.filter.with_subitems',
    defaultMessage: 'With contained items',
  },
  withoutSubitems: {
    id: 'recyclebin.filter.without_subitems',
    defaultMessage: 'Without contained items',
  },
  applyFilters: {
    id: 'recyclebin.button.apply_filters',
    defaultMessage: 'Apply filters',
  },
  clearAll: {
    id: 'recyclebin.button.clear_filters',
    defaultMessage: 'Clear all filters',
  },
  selectAll: {
    id: 'recyclebin.action.select_all',
    defaultMessage: 'Select all deleted items',
  },
  selectItem: {
    id: 'recyclebin.action.select_item',
    defaultMessage: 'Select {title}',
  },
  itemTitle: { id: 'recyclebin.field.title', defaultMessage: 'Title' },
  path: { id: 'recyclebin.field.path', defaultMessage: 'Original path' },
  deletionDate: {
    id: 'recyclebin.field.deletion_date',
    defaultMessage: 'Deletion date',
  },
  hasChildren: {
    id: 'recyclebin.label.has_children',
    defaultMessage: 'Contains items',
  },
  restoreSelected: {
    id: 'recyclebin.button.restore_selected',
    defaultMessage: 'Restore selected',
  },
  deleteSelected: {
    id: 'recyclebin.button.delete_selected',
    defaultMessage: 'Delete selected',
  },
  empty: {
    id: 'recyclebin.button.empty',
    defaultMessage: 'Empty recycle bin',
  },
  confirmDeleteSelected: {
    id: 'recyclebin.confirm.delete_selected',
    defaultMessage:
      'Permanently delete the selected items? This cannot be undone.',
  },
  confirmDelete: {
    id: 'recyclebin.confirm.delete_item',
    defaultMessage: 'Permanently delete this item? This cannot be undone.',
  },
  confirmEmpty: {
    id: 'recyclebin.confirm.empty',
    defaultMessage:
      'Permanently delete every item in the recycle bin? This cannot be undone.',
  },
  noItems: {
    id: 'recyclebin.message.empty',
    defaultMessage: 'The recycle bin is empty.',
  },
  noMatches: {
    id: 'recyclebin.message.no_matches',
    defaultMessage: 'No items match the current filters.',
  },
  resultRange: {
    id: 'recyclebin.message.result_range',
    defaultMessage: 'Showing {start}–{end} of {total}',
  },
  back: {
    id: 'recyclebin.link.back',
    defaultMessage: 'Back to recycle bin',
  },
  details: {
    id: 'recyclebin.heading.details',
    defaultMessage: 'Deleted item details',
  },
  restoreTo: {
    id: 'recyclebin.heading.restore_to',
    defaultMessage: 'Restore to',
  },
  targetPath: {
    id: 'recyclebin.field.target_path',
    defaultMessage: 'Target path',
  },
  targetPathHelp: {
    id: 'recyclebin.help.target_path',
    defaultMessage:
      'Leave unchanged to restore to the original parent, or enter another portal-relative path.',
  },
  restore: { id: 'recyclebin.button.restore', defaultMessage: 'Restore' },
  permanentlyDelete: {
    id: 'recyclebin.button.permanently_delete',
    defaultMessage: 'Permanently delete',
  },
  children: {
    id: 'recyclebin.heading.children',
    defaultMessage: 'Contained items ({count})',
  },
  childrenCount: {
    id: 'recyclebin.field.children_count',
    defaultMessage: 'Nested items',
  },
  childTargetPath: {
    id: 'recyclebin.field.child_target_path',
    defaultMessage: 'Target path for {title}',
  },
  loading: {
    id: 'recyclebin.message.loading',
    defaultMessage: 'Loading recycle bin…',
  },
  unavailableTitle: {
    id: 'recyclebin.error.unavailable.title',
    defaultMessage: 'Recycle bin unavailable',
  },
  unavailableDescription: {
    id: 'recyclebin.error.unavailable.description',
    defaultMessage:
      'The recycle bin is unavailable, or you do not have permission to access it.',
  },
  itemNotFoundTitle: {
    id: 'recyclebin.error.not_found.title',
    defaultMessage: 'Item not found',
  },
  itemNotFoundDescription: {
    id: 'recyclebin.error.not_found.description',
    defaultMessage:
      'This item may already have been restored or permanently deleted.',
  },
  operationSucceeded: {
    id: 'recyclebin.message.operation_succeeded',
    defaultMessage: 'Operation completed successfully.',
  },
  partialFailure: {
    id: 'recyclebin.message.partial_failure',
    defaultMessage: '{succeeded} succeeded and {failed} failed.',
  },
  dateDesc: {
    id: 'recyclebin.sort.date_desc',
    defaultMessage: 'Deletion date, newest first',
  },
  dateAsc: {
    id: 'recyclebin.sort.date_asc',
    defaultMessage: 'Deletion date, oldest first',
  },
  titleAsc: {
    id: 'recyclebin.sort.title_asc',
    defaultMessage: 'Title, A–Z',
  },
  titleDesc: {
    id: 'recyclebin.sort.title_desc',
    defaultMessage: 'Title, Z–A',
  },
  typeAsc: { id: 'recyclebin.sort.type_asc', defaultMessage: 'Type, A–Z' },
  typeDesc: { id: 'recyclebin.sort.type_desc', defaultMessage: 'Type, Z–A' },
  workflowAsc: {
    id: 'recyclebin.sort.workflow_asc',
    defaultMessage: 'Workflow state, A–Z',
  },
  workflowDesc: {
    id: 'recyclebin.sort.workflow_desc',
    defaultMessage: 'Workflow state, Z–A',
  },
});
