import { useEffect, useMemo, useState } from 'react';
import { useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import { Container, Loader, Message, Segment } from 'semantic-ui-react';
import Helmet from '@plone/volto/helpers/Helmet/Helmet';
import { flattenToAppURL } from '@plone/volto/helpers/Url/Url';
import {
  getRecycleBinItem,
  purgeRecycleBinItem,
  restoreRecycleBinItem,
} from '../../actions/recyclebin';
import type { RecycleBinState } from '../../reducers/recyclebin';
import RecycleBinItemDetails from './RecycleBinItemDetails';
import type { RecycleBinOperationMessage } from './RecycleBinListing';
import messages from './messages';
import { getErrorMessage } from './utils';

interface RootState {
  recycleBin: RecycleBinState;
}

export default function RecycleBinItemView() {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const history = useHistory();
  const intl = useIntl();
  const dispatch = useDispatch<any>();
  const state = useSelector((root: RootState) => root.recycleBin);
  const [running, setRunning] = useState(false);
  const [operationMessage, setOperationMessage] =
    useState<RecycleBinOperationMessage | null>(null);
  const batching = useMemo(() => {
    const params = new URLSearchParams(location.search);
    return {
      b_start: params.get('b_start') ?? undefined,
      b_size: params.get('b_size') ?? undefined,
    };
  }, [location.search]);

  const refresh = () => dispatch(getRecycleBinItem(id, batching));

  useEffect(() => {
    dispatch(getRecycleBinItem(id, batching));
  }, [batching, dispatch, id]);

  const item = state.item;

  const restore = async (targetPath?: string) => {
    setRunning(true);
    setOperationMessage(null);
    try {
      const result = await dispatch(
        restoreRecycleBinItem(
          id,
          targetPath ? { target_path: targetPath } : {},
        ),
      );
      const restoredUrl = result?.restored_item?.['@id'];
      history.push(
        restoredUrl ? flattenToAppURL(restoredUrl) : '/@@recyclebin',
      );
    } catch (error) {
      setOperationMessage({ text: getErrorMessage(error), error: true });
    } finally {
      setRunning(false);
    }
  };

  const purge = async () => {
    setRunning(true);
    try {
      await dispatch(purgeRecycleBinItem(id));
      history.push('/@@recyclebin');
    } catch (error) {
      setOperationMessage({ text: getErrorMessage(error), error: true });
    } finally {
      setRunning(false);
    }
  };

  const restoreChild = async (restoreId: string, targetPath: string) => {
    setRunning(true);
    setOperationMessage(null);
    try {
      await dispatch(
        restoreRecycleBinItem(id, {
          restore_id: restoreId,
          target_path: targetPath,
        }),
      );
      await refresh();
      setOperationMessage({
        text: intl.formatMessage(messages.operationSucceeded),
      });
    } catch (error) {
      setOperationMessage({ text: getErrorMessage(error), error: true });
    } finally {
      setRunning(false);
    }
  };

  return (
    <Container id="page-recycle-bin-item" className="recycle-bin-page">
      <Helmet title={item?.title || intl.formatMessage(messages.title)} />
      {state.getItem.loading && !item ? (
        <Segment basic className="recycle-bin-loading">
          <Loader active inline="centered">
            {intl.formatMessage(messages.loading)}
          </Loader>
        </Segment>
      ) : null}
      {state.getItem.error ? (
        <Message negative>
          <Message.Header>
            {intl.formatMessage(messages.itemNotFoundTitle)}
          </Message.Header>
          <p>{intl.formatMessage(messages.itemNotFoundDescription)}</p>
        </Message>
      ) : null}
      {item ? (
        <RecycleBinItemDetails
          item={item}
          busy={running}
          operationMessage={operationMessage}
          onRestore={restore}
          onPurge={purge}
          onRestoreChild={restoreChild}
        />
      ) : null}
    </Container>
  );
}
