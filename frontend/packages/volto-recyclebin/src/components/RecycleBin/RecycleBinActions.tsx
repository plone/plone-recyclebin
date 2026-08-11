import { useIntl } from 'react-intl';
import { Button } from 'semantic-ui-react';
import messages from './messages';

export default function RecycleBinActions({
  selectedItems,
  busy,
  onRestore,
  onPurge,
  onEmpty,
}: {
  selectedItems: string[];
  busy: boolean;
  onRestore: (ids: string[]) => void;
  onPurge: (ids: string[]) => void;
  onEmpty: () => void;
}) {
  const intl = useIntl();
  const noneSelected = selectedItems.length === 0;

  return (
    <div className="recycle-bin-actions">
      <Button
        primary
        disabled={noneSelected || busy}
        loading={busy}
        onClick={() => onRestore(selectedItems)}
      >
        {intl.formatMessage(messages.restoreSelected)}
      </Button>
      <Button
        negative
        disabled={noneSelected || busy}
        onClick={() => {
          if (
            // Destructive actions require explicit confirmation.
            // eslint-disable-next-line no-alert
            window.confirm(intl.formatMessage(messages.confirmDeleteSelected))
          ) {
            onPurge(selectedItems);
          }
        }}
      >
        {intl.formatMessage(messages.deleteSelected)}
      </Button>
      <Button
        disabled={busy}
        onClick={() => {
          // Destructive actions require explicit confirmation.
          // eslint-disable-next-line no-alert
          if (window.confirm(intl.formatMessage(messages.confirmEmpty))) {
            onEmpty();
          }
        }}
      >
        {intl.formatMessage(messages.empty)}
      </Button>
    </div>
  );
}
