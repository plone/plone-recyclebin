import { useState } from 'react';
import { useIntl } from 'react-intl';
import { Link } from 'react-router-dom';
import { Header, Message, Segment } from 'semantic-ui-react';
import type { GetRecycleBinResponse } from '../../types';
import RecycleBinActions from './RecycleBinActions';
import RecycleBinActiveFilters from './RecycleBinActiveFilters';
import RecycleBinFilters from './RecycleBinFilters';
import RecycleBinTable from './RecycleBinTable';
import messages from './messages';
import { getPagination, listingUrl, type RecycleBinQueryState } from './utils';

export interface RecycleBinOperationMessage {
  text: string;
  error?: boolean;
  failures?: Array<{ id: string; message: string }>;
}

export default function RecycleBinListing({
  recycleBin,
  queryState,
  busy,
  operationMessage,
  onRestore,
  onPurge,
  onEmpty,
}: {
  recycleBin: GetRecycleBinResponse;
  queryState: RecycleBinQueryState;
  busy: boolean;
  operationMessage?: RecycleBinOperationMessage | null;
  onRestore: (ids: string[]) => void;
  onPurge: (ids: string[]) => void;
  onEmpty: () => void;
}) {
  const intl = useIntl();
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const pagination = getPagination(
    recycleBin.items_total,
    queryState.b_start,
    queryState.b_size,
  );
  const hasFilters = Object.entries(queryState).some(
    ([key, value]) => value && !['b_start', 'b_size', 'sort_by'].includes(key),
  );
  const pageUrl = (offset: number) =>
    listingUrl({
      ...queryState,
      b_start: String(offset),
      b_size: String(pagination.size),
    });

  return (
    <section className="recycle-bin-listing">
      <Header as="h1" className="documentFirstHeading">
        {intl.formatMessage(messages.title)}
      </Header>
      <p className="documentDescription">
        {intl.formatMessage(messages.description)}
      </p>

      {operationMessage ? (
        <Message
          negative={operationMessage.error}
          positive={!operationMessage.error}
        >
          <Message.Content>
            <p>{operationMessage.text}</p>
            {operationMessage.failures?.length ? (
              <ul>
                {operationMessage.failures.map((failure) => (
                  <li key={failure.id}>
                    {failure.id}: {failure.message}
                  </li>
                ))}
              </ul>
            ) : null}
          </Message.Content>
        </Message>
      ) : null}

      <RecycleBinFilters items={recycleBin.items} queryState={queryState} />
      <RecycleBinActiveFilters queryState={queryState} />

      {recycleBin.items_total === 0 ? (
        <Segment placeholder textAlign="center">
          <Header as="h2">
            {intl.formatMessage(
              hasFilters ? messages.noMatches : messages.noItems,
            )}
          </Header>
          {hasFilters ? (
            <Link to="/@@recyclebin">
              {intl.formatMessage(messages.clearAll)}
            </Link>
          ) : null}
        </Segment>
      ) : (
        <>
          <p className="recycle-bin-range">
            {intl.formatMessage(messages.resultRange, {
              start: pagination.start,
              end: pagination.end,
              total: recycleBin.items_total,
            })}
          </p>
          <RecycleBinTable
            items={recycleBin.items}
            selectedItems={selectedItems}
            onSelectionChange={setSelectedItems}
          />
          <div className="recycle-bin-listing-footer">
            <RecycleBinActions
              selectedItems={selectedItems}
              busy={busy}
              onRestore={onRestore}
              onPurge={onPurge}
              onEmpty={onEmpty}
            />
            {(pagination.hasPrevious || pagination.hasNext) && (
              <nav className="recycle-bin-pagination" aria-label="Pagination">
                {pagination.hasPrevious ? (
                  <Link
                    className="ui button"
                    to={pageUrl(pagination.previousStart)}
                  >
                    {intl.formatMessage(messages.previous)}
                  </Link>
                ) : null}
                {pagination.hasNext ? (
                  <Link
                    className="ui button"
                    to={pageUrl(pagination.nextStart)}
                  >
                    {intl.formatMessage(messages.next)}
                  </Link>
                ) : null}
              </nav>
            )}
          </div>
        </>
      )}
    </section>
  );
}
