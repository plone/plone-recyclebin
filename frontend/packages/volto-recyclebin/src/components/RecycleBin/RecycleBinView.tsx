import { useEffect, useMemo, useState } from 'react';
import { useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { Container, Loader, Message, Segment } from 'semantic-ui-react';
import Helmet from '@plone/volto/helpers/Helmet/Helmet';
import { flattenToAppURL } from '@plone/volto/helpers/Url/Url';
import {
  emptyRecycleBin,
  getRecycleBin,
  purgeRecycleBinItem,
  restoreRecycleBinItem,
} from '../../actions/recyclebin';
import type { RecycleBinState } from '../../reducers/recyclebin';
import RecycleBinListing, {
  type RecycleBinOperationMessage,
} from './RecycleBinListing';
import messages from './messages';
import {
  getErrorMessage,
  getQueryState,
  normalizeRecycleBin,
  performRecycleBinItems,
  toRecycleBinQuery,
} from './utils';

interface RootState {
  recycleBin: RecycleBinState;
}

export default function RecycleBinView() {
  const intl = useIntl();
  const dispatch = useDispatch<any>();
  const history = useHistory();
  const location = useLocation();
  const state = useSelector((root: RootState) => root.recycleBin);
  const [running, setRunning] = useState(false);
  const [operationMessage, setOperationMessage] =
    useState<RecycleBinOperationMessage | null>(null);
  const queryState = useMemo(
    () => getQueryState(location.search),
    [location.search],
  );

  useEffect(() => {
    dispatch(getRecycleBin(toRecycleBinQuery(queryState)));
  }, [dispatch, queryState]);

  const listing = useMemo(
    () => (state.listing ? normalizeRecycleBin(state.listing) : null),
    [state.listing],
  );

  const refresh = () => dispatch(getRecycleBin(toRecycleBinQuery(queryState)));

  const runForItems = async (ids: string[], action: 'restore' | 'purge') => {
    setRunning(true);
    setOperationMessage(null);
    const { failures, succeeded, restoredUrl } = await performRecycleBinItems(
      ids,
      action,
      (id) => dispatch(restoreRecycleBinItem(id)),
      (id) => dispatch(purgeRecycleBinItem(id)),
    );

    setRunning(false);
    if (
      !failures.length &&
      action === 'restore' &&
      ids.length === 1 &&
      restoredUrl
    ) {
      history.push(flattenToAppURL(restoredUrl));
      return;
    }

    await refresh();
    setOperationMessage(
      failures.length
        ? {
            text: intl.formatMessage(messages.partialFailure, {
              succeeded,
              failed: failures.length,
            }),
            error: true,
            failures,
          }
        : { text: intl.formatMessage(messages.operationSucceeded) },
    );
  };

  const empty = async () => {
    setRunning(true);
    setOperationMessage(null);
    try {
      await dispatch(emptyRecycleBin());
      await refresh();
      setOperationMessage({
        text: intl.formatMessage(messages.operationSucceeded),
      });
    } catch (error) {
      setOperationMessage({
        text: getErrorMessage(error),
        error: true,
      });
    } finally {
      setRunning(false);
    }
  };

  return (
    <Container id="page-recycle-bin" className="recycle-bin-page">
      <Helmet title={intl.formatMessage(messages.title)} />
      {state.get.loading && !listing ? (
        <Segment basic className="recycle-bin-loading">
          <Loader active inline="centered">
            {intl.formatMessage(messages.loading)}
          </Loader>
        </Segment>
      ) : null}
      {state.get.error ? (
        <Message negative>
          <Message.Header>
            {intl.formatMessage(messages.unavailableTitle)}
          </Message.Header>
          <p>{intl.formatMessage(messages.unavailableDescription)}</p>
        </Message>
      ) : null}
      {listing ? (
        <RecycleBinListing
          recycleBin={listing}
          queryState={queryState}
          busy={running}
          operationMessage={operationMessage}
          onRestore={(ids) => runForItems(ids, 'restore')}
          onPurge={(ids) => runForItems(ids, 'purge')}
          onEmpty={empty}
        />
      ) : null}
    </Container>
  );
}
