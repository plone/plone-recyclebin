import { useState } from 'react';
import { useIntl } from 'react-intl';
import { useHistory, useLocation } from 'react-router-dom';
import { Button, Header, Table } from 'semantic-ui-react';
import type { RecycleBinChildItem } from '../../types';
import VoltoPagination from './VoltoPagination';
import messages from './messages';
import { getBatching } from './utils';

export default function RecycleBinChildrenTable({
  items,
  itemsTotal,
  busy,
  onRestore,
}: {
  items: RecycleBinChildItem[];
  itemsTotal: number;
  busy: boolean;
  onRestore: (restoreId: string, targetPath: string) => void;
}) {
  const intl = useIntl();
  const history = useHistory();
  const location = useLocation();
  const [targetPaths, setTargetPaths] = useState<Record<string, string>>({});
  const params = new URLSearchParams(location.search);
  const { pageSize, currentPage, totalPages } = getBatching(
    itemsTotal,
    params.get('b_start'),
    params.get('b_size'),
  );

  if (!itemsTotal) return null;

  const changePage = (page: number) => {
    const nextParams = new URLSearchParams(location.search);
    nextParams.set('b_start', String(page * pageSize));
    nextParams.set('b_size', String(pageSize));
    history.push(`${location.pathname}?${nextParams.toString()}`);
  };

  return (
    <section className="recycle-bin-children">
      <Header as="h2">
        {intl.formatMessage(messages.children, { count: itemsTotal })}
      </Header>
      <div className="recycle-bin-table-wrapper">
        <Table celled compact>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>
                {intl.formatMessage(messages.itemTitle)}
              </Table.HeaderCell>
              <Table.HeaderCell>
                {intl.formatMessage(messages.type)}
              </Table.HeaderCell>
              <Table.HeaderCell>
                {intl.formatMessage(messages.workflowState)}
              </Table.HeaderCell>
              <Table.HeaderCell>
                {intl.formatMessage(messages.path)}
              </Table.HeaderCell>
              <Table.HeaderCell>
                {intl.formatMessage(messages.childrenCount)}
              </Table.HeaderCell>
              <Table.HeaderCell>
                {intl.formatMessage(messages.restoreTo)}
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {items.map((item) => {
              const targetPath = targetPaths[item.restore_id] ?? '';
              return (
                <Table.Row key={item.restore_id}>
                  <Table.Cell>{item.title || item.id}</Table.Cell>
                  <Table.Cell>{item['@type']}</Table.Cell>
                  <Table.Cell>{item.review_state || '—'}</Table.Cell>
                  <Table.Cell className="recycle-bin-path">
                    {item.path}
                  </Table.Cell>
                  <Table.Cell>{item.children_count ?? '—'}</Table.Cell>
                  <Table.Cell>
                    <div className="recycle-bin-child-restore">
                      <input
                        required
                        aria-label={intl.formatMessage(
                          messages.childTargetPath,
                          {
                            title: item.title || item.id,
                          },
                        )}
                        value={targetPath}
                        onChange={(event) =>
                          setTargetPaths({
                            ...targetPaths,
                            [item.restore_id]: event.target.value,
                          })
                        }
                      />
                      <Button
                        primary
                        size="small"
                        disabled={busy || !targetPath.trim()}
                        onClick={() =>
                          onRestore(item.restore_id, targetPath.trim())
                        }
                      >
                        {intl.formatMessage(messages.restore)}
                      </Button>
                    </div>
                  </Table.Cell>
                </Table.Row>
              );
            })}
          </Table.Body>
        </Table>
      </div>
      {totalPages > 1 ? (
        <div className="recycle-bin-pagination">
          <VoltoPagination
            current={currentPage}
            total={totalPages}
            onChangePage={(_event: unknown, { value }: { value: number }) =>
              changePage(value)
            }
          />
        </div>
      ) : null}
    </section>
  );
}
