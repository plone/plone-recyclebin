import { useIntl } from 'react-intl';
import { Link } from 'react-router-dom';
import { Checkbox, Label, Table } from 'semantic-ui-react';
import type { RecycleBinItemSummary } from '../../types';
import messages from './messages';
import { formatRecycleBinDate } from './utils';

export default function RecycleBinTable({
  items,
  selectedItems,
  onSelectionChange,
}: {
  items: RecycleBinItemSummary[];
  selectedItems: string[];
  onSelectionChange: (items: string[]) => void;
}) {
  const intl = useIntl();
  const allSelected =
    items.length > 0 &&
    items.every((item) => selectedItems.includes(item.recycle_id));

  const toggle = (id: string, checked: boolean) => {
    onSelectionChange(
      checked
        ? Array.from(new Set([...selectedItems, id]))
        : selectedItems.filter((candidate) => candidate !== id),
    );
  };

  return (
    <div className="recycle-bin-table-wrapper">
      <Table celled compact selectable className="recycle-bin-table">
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell collapsing>
              <Checkbox
                aria-label={intl.formatMessage(messages.selectAll)}
                checked={allSelected}
                onChange={(_event, data) =>
                  onSelectionChange(
                    data.checked ? items.map((item) => item.recycle_id) : [],
                  )
                }
              />
            </Table.HeaderCell>
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
              {intl.formatMessage(messages.deletionDate)}
            </Table.HeaderCell>
            <Table.HeaderCell>
              {intl.formatMessage(messages.deletedBy)}
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {items.map((item) => (
            <Table.Row key={item.recycle_id}>
              <Table.Cell collapsing>
                <Checkbox
                  aria-label={intl.formatMessage(messages.selectItem, {
                    title: item.title || item.id,
                  })}
                  checked={selectedItems.includes(item.recycle_id)}
                  onChange={(_event, data) =>
                    toggle(item.recycle_id, Boolean(data.checked))
                  }
                />
              </Table.Cell>
              <Table.Cell>
                <Link to={`/@@recyclebin/${item.recycle_id}`}>
                  {item.title || item.id}
                </Link>{' '}
                {item.has_children ? (
                  <Label size="mini" color="teal">
                    {intl.formatMessage(messages.hasChildren)}
                  </Label>
                ) : null}
              </Table.Cell>
              <Table.Cell>{item['@type']}</Table.Cell>
              <Table.Cell>{item.review_state || '—'}</Table.Cell>
              <Table.Cell className="recycle-bin-path">{item.path}</Table.Cell>
              <Table.Cell>
                {formatRecycleBinDate(item.deletion_date, intl.locale)}
              </Table.Cell>
              <Table.Cell>{item.deleted_by}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
}
