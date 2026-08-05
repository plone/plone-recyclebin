import { useState } from 'react';
import { useIntl } from 'react-intl';
import { Button, Form, Header, Segment } from 'semantic-ui-react';
import messages from './messages';

export default function RecycleBinRestorePanel({
  busy,
  onRestore,
  onPurge,
}: {
  busy: boolean;
  onRestore: (targetPath?: string) => void;
  onPurge: () => void;
}) {
  const intl = useIntl();
  const [targetPath, setTargetPath] = useState('');

  return (
    <Segment className="recycle-bin-restore-panel">
      <Header as="h2">{intl.formatMessage(messages.restoreTo)}</Header>
      <Form
        onSubmit={(event) => {
          event.preventDefault();
          onRestore(targetPath.trim() || undefined);
        }}
      >
        <Form.Field>
          <label htmlFor="recycle-bin-target-path">
            {intl.formatMessage(messages.targetPath)}
          </label>
          <input
            id="recycle-bin-target-path"
            name="target_path"
            value={targetPath}
            onChange={(event) => setTargetPath(event.target.value)}
          />
          <small>{intl.formatMessage(messages.targetPathHelp)}</small>
        </Form.Field>
        <Button primary type="submit" loading={busy} disabled={busy}>
          {intl.formatMessage(messages.restore)}
        </Button>
        <Button
          negative
          type="button"
          disabled={busy}
          onClick={() => {
            // Destructive actions require explicit confirmation.
            // eslint-disable-next-line no-alert
            if (window.confirm(intl.formatMessage(messages.confirmDelete))) {
              onPurge();
            }
          }}
        >
          {intl.formatMessage(messages.permanentlyDelete)}
        </Button>
      </Form>
    </Segment>
  );
}
