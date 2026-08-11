import { useIntl } from 'react-intl';
import { Link } from 'react-router-dom';
import messages from './messages';
import { removeQueryParameter, type RecycleBinQueryState } from './utils';

const labels: Partial<
  Record<keyof RecycleBinQueryState, keyof typeof messages>
> = {
  title: 'search',
  portal_type: 'type',
  deleted_by: 'deletedBy',
  has_subitems: 'containsItems',
  language: 'language',
  review_state: 'workflowState',
  date_from: 'dateFrom',
  date_to: 'dateTo',
};

export default function RecycleBinActiveFilters({
  queryState,
}: {
  queryState: RecycleBinQueryState;
}) {
  const intl = useIntl();
  const active = Object.entries(queryState).filter(
    ([key, value]) => value && labels[key as keyof RecycleBinQueryState],
  );

  if (!active.length) return null;

  return (
    <div className="recycle-bin-active-filters">
      {active.map(([key, value]) => (
        <Link
          key={key}
          className="ui label"
          to={removeQueryParameter(
            queryState,
            key as keyof RecycleBinQueryState,
          )}
        >
          {intl.formatMessage(
            messages[labels[key as keyof RecycleBinQueryState]!],
          )}
          : {value} <span aria-hidden="true">×</span>
        </Link>
      ))}
      <Link className="recycle-bin-clear-filters" to="/@@recyclebin">
        {intl.formatMessage(messages.clearAll)}
      </Link>
    </div>
  );
}
