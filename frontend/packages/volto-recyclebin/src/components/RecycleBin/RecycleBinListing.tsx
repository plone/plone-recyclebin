import { useState, type ComponentType } from 'react';
import { useIntl } from 'react-intl';
import { Link, useHistory } from 'react-router-dom';
import { Header, Message, Segment } from 'semantic-ui-react';
import Pagination from '@plone/volto/components/theme/Pagination/Pagination';
import type { GetRecycleBinResponse } from '../../types';
import RecycleBinActions from './RecycleBinActions';
import RecycleBinActiveFilters from './RecycleBinActiveFilters';
import RecycleBinFilters from './RecycleBinFilters';
import RecycleBinTable from './RecycleBinTable';
import messages from './messages';
import { listingUrl, type RecycleBinQueryState } from './utils';

const VoltoPagination = Pagination as unknown as ComponentType<{
  current: number;
  total: number;
  onChangePage: (event: unknown, data: { value: number }) => void;
}>;

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
  const history = useHistory();
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const requestedPageSize = Number(queryState.b_size ?? 25);
  const pageSize =
    Number.isFinite(requestedPageSize) && requestedPageSize > 0
      ? requestedPageSize
      : 25;
  const requestedOffset = Number(queryState.b_start ?? 0);
  const offset = Number.isFinite(requestedOffset) ? requestedOffset : 0;
  const currentPage = Math.floor(offset / pageSize);
  const totalPages = Math.ceil(recycleBin.items_total / pageSize);
  const rangeStart = recycleBin.items_total === 0 ? 0 : offset + 1;
  const rangeEnd = Math.min(offset + pageSize, recycleBin.items_total);
  const hasFilters = Object.entries(queryState).some(
    ([key, value]) => value && !['b_start', 'b_size', 'sort_by'].includes(key),
  );
  const pageUrl = (page: number) =>
    listingUrl({
      ...queryState,
      b_start: String(page * pageSize),
      b_size: String(pageSize),
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
              start: rangeStart,
              end: rangeEnd,
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
            {totalPages > 1 ? (
              <div className="recycle-bin-pagination">
                <VoltoPagination
                  current={currentPage}
                  total={totalPages}
                  onChangePage={(
                    _event: unknown,
                    { value }: { value: number },
                  ) => history.push(pageUrl(value))}
                />
              </div>
            ) : null}
          </div>
        </>
      )}
    </section>
  );
}
