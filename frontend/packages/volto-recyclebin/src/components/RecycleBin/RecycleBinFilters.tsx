import { useIntl } from 'react-intl';
import { useHistory } from 'react-router-dom';
import { Button, Form } from 'semantic-ui-react';
import type { RecycleBinItemSummary } from '../../types';
import messages from './messages';
import {
  getFilterOptions,
  listingUrl,
  type RecycleBinQueryState,
  type RecycleBinSortBy,
} from './utils';

const sortOptions: Array<[RecycleBinSortBy, keyof typeof messages]> = [
  ['date_desc', 'dateDesc'],
  ['date_asc', 'dateAsc'],
  ['title_asc', 'titleAsc'],
  ['title_desc', 'titleDesc'],
  ['type_asc', 'typeAsc'],
  ['type_desc', 'typeDesc'],
  ['workflow_asc', 'workflowAsc'],
  ['workflow_desc', 'workflowDesc'],
];

export default function RecycleBinFilters({
  items,
  queryState,
}: {
  items: RecycleBinItemSummary[];
  queryState: RecycleBinQueryState;
}) {
  const intl = useIntl();
  const history = useHistory();
  const types = getFilterOptions(items, '@type');
  const users = getFilterOptions(items, 'deleted_by');
  const languages = getFilterOptions(items, 'language');
  const workflowStates = getFilterOptions(items, 'review_state');
  const advancedOpen = Boolean(
    queryState.portal_type ||
      queryState.deleted_by ||
      queryState.has_subitems ||
      queryState.language ||
      queryState.review_state ||
      queryState.date_from ||
      queryState.date_to,
  );

  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const nextState = Object.fromEntries(
      Array.from(data.entries())
        .map(([key, value]) => [key, String(value).trim()])
        .filter(([, value]) => value),
    ) as RecycleBinQueryState;
    history.push(listingUrl(nextState));
  };

  return (
    <div className="ui secondary segment">
      <Form className="recycle-bin-filters" onSubmit={submit}>
        <Form.Group widths="equal">
          <Form.Field>
            <label htmlFor="recycle-bin-title">
              {intl.formatMessage(messages.search)}
            </label>
            <input
              id="recycle-bin-title"
              name="title"
              type="search"
              defaultValue={queryState.title ?? ''}
            />
          </Form.Field>
          <Form.Field>
            <label htmlFor="recycle-bin-sort">
              {intl.formatMessage(messages.sort)}
            </label>
            <select
              id="recycle-bin-sort"
              name="sort_by"
              defaultValue={queryState.sort_by ?? 'date_desc'}
              className="ui fluid dropdown"
            >
              {sortOptions.map(([value, message]) => (
                <option key={value} value={value}>
                  {intl.formatMessage(messages[message])}
                </option>
              ))}
            </select>
          </Form.Field>
          <Form.Field>
            <label htmlFor="recycle-bin-size">
              {intl.formatMessage(messages.pageSize)}
            </label>
            <select
              id="recycle-bin-size"
              name="b_size"
              defaultValue={queryState.b_size ?? '25'}
              className="ui fluid dropdown"
            >
              {[10, 25, 50, 100].map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </Form.Field>
        </Form.Group>

        <details open={advancedOpen}>
          <summary>{intl.formatMessage(messages.advanced)}</summary>
          <Form.Group widths="equal" className="recycle-bin-advanced-fields">
            <Form.Field>
              <label htmlFor="recycle-bin-type">
                {intl.formatMessage(messages.type)}
              </label>
              <select
                id="recycle-bin-type"
                name="portal_type"
                defaultValue={queryState.portal_type ?? ''}
                className="ui fluid dropdown"
              >
                <option value="">{intl.formatMessage(messages.any)}</option>
                {types.map((value) => (
                  <option key={value}>{value}</option>
                ))}
              </select>
            </Form.Field>
            <Form.Field>
              <label htmlFor="recycle-bin-user">
                {intl.formatMessage(messages.deletedBy)}
              </label>
              <select
                id="recycle-bin-user"
                name="deleted_by"
                defaultValue={queryState.deleted_by ?? ''}
                className="ui fluid dropdown"
              >
                <option value="">{intl.formatMessage(messages.any)}</option>
                {users.map((value) => (
                  <option key={value}>{value}</option>
                ))}
              </select>
            </Form.Field>
            <Form.Field>
              <label htmlFor="recycle-bin-children">
                {intl.formatMessage(messages.containsItems)}
              </label>
              <select
                id="recycle-bin-children"
                name="has_subitems"
                defaultValue={queryState.has_subitems ?? ''}
                className="ui fluid dropdown"
              >
                <option value="">{intl.formatMessage(messages.any)}</option>
                <option value="true">
                  {intl.formatMessage(messages.withSubitems)}
                </option>
                <option value="false">
                  {intl.formatMessage(messages.withoutSubitems)}
                </option>
              </select>
            </Form.Field>
            <Form.Field>
              <label htmlFor="recycle-bin-language">
                {intl.formatMessage(messages.language)}
              </label>
              <select
                id="recycle-bin-language"
                name="language"
                defaultValue={queryState.language ?? ''}
                className="ui fluid dropdown"
              >
                <option value="">{intl.formatMessage(messages.any)}</option>
                {languages.map((value) => (
                  <option key={value}>{value}</option>
                ))}
              </select>
            </Form.Field>
          </Form.Group>
          <Form.Group widths="equal">
            <Form.Field>
              <label htmlFor="recycle-bin-workflow">
                {intl.formatMessage(messages.workflowState)}
              </label>
              <select
                id="recycle-bin-workflow"
                name="review_state"
                defaultValue={queryState.review_state ?? ''}
                className="ui fluid dropdown"
              >
                <option value="">{intl.formatMessage(messages.any)}</option>
                {workflowStates.map((value) => (
                  <option key={value}>{value}</option>
                ))}
              </select>
            </Form.Field>
            <Form.Field>
              <label htmlFor="recycle-bin-date-from">
                {intl.formatMessage(messages.dateFrom)}
              </label>
              <input
                id="recycle-bin-date-from"
                name="date_from"
                type="date"
                defaultValue={queryState.date_from ?? ''}
              />
            </Form.Field>
            <Form.Field>
              <label htmlFor="recycle-bin-date-to">
                {intl.formatMessage(messages.dateTo)}
              </label>
              <input
                id="recycle-bin-date-to"
                name="date_to"
                type="date"
                defaultValue={queryState.date_to ?? ''}
              />
            </Form.Field>
          </Form.Group>
        </details>
        <Button primary type="submit">
          {intl.formatMessage(messages.applyFilters)}
        </Button>
      </Form>
    </div>
  );
}
