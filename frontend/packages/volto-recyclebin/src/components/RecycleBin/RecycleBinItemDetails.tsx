import { useIntl } from 'react-intl';
import { Link } from 'react-router-dom';
import { Header, Label, Message, Table } from 'semantic-ui-react';
import type { GetRecycleBinItemResponse } from '../../types';
import RecycleBinChildrenTable from './RecycleBinChildrenTable';
import RecycleBinRestorePanel from './RecycleBinRestorePanel';
import type { RecycleBinOperationMessage } from './RecycleBinListing';
import messages from './messages';
import { formatRecycleBinDate } from './utils';

export default function RecycleBinItemDetails({
  item,
  busy,
  operationMessage,
  onRestore,
  onPurge,
  onRestoreChild,
}: {
  item: GetRecycleBinItemResponse;
  busy: boolean;
  operationMessage?: RecycleBinOperationMessage | null;
  onRestore: (targetPath?: string) => void;
  onPurge: () => void;
  onRestoreChild: (restoreId: string, targetPath: string) => void;
}) {
  const intl = useIntl();

  return (
    <section className="recycle-bin-item-details">
      <Link className="recycle-bin-back" to="/@@recyclebin">
        ← {intl.formatMessage(messages.back)}
      </Link>
      <Header as="h1" className="documentFirstHeading">
        {item.title || item.id}
      </Header>
      <Label>{item['@type']}</Label>

      {operationMessage ? (
        <Message
          negative={operationMessage.error}
          positive={!operationMessage.error}
          content={operationMessage.text}
        />
      ) : null}

      <Header as="h2">{intl.formatMessage(messages.details)}</Header>
      <Table definition compact>
        <Table.Body>
          <Table.Row>
            <Table.Cell width={4}>
              {intl.formatMessage(messages.path)}
            </Table.Cell>
            <Table.Cell>{item.path}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>
              {intl.formatMessage(messages.workflowState)}
            </Table.Cell>
            <Table.Cell>{item.review_state || '—'}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>{intl.formatMessage(messages.deletionDate)}</Table.Cell>
            <Table.Cell>
              {formatRecycleBinDate(item.deletion_date, intl.locale)}
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>{intl.formatMessage(messages.deletedBy)}</Table.Cell>
            <Table.Cell>{item.deleted_by}</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>

      <RecycleBinRestorePanel
        busy={busy}
        onRestore={onRestore}
        onPurge={onPurge}
      />
      <RecycleBinChildrenTable
        items={item.items}
        itemsTotal={item.items_total}
        busy={busy}
        onRestore={onRestoreChild}
      />
    </section>
  );
}
