import { useIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Plug } from '@plone/volto/components/manage/Pluggable';
import Icon from '@plone/volto/components/theme/Icon/Icon';
import rightArrowSVG from '@plone/volto/icons/right-key.svg';
import messages from '../RecycleBin/messages';

interface UserAction {
  id?: string;
}

interface RootState {
  actions?: {
    actions?: {
      user?: UserAction[];
    };
  };
}

export function RecycleBinUserMenuPlug({ available }: { available: boolean }) {
  const intl = useIntl();
  const title = intl.formatMessage(messages.title);

  return (
    <Plug
      pluggable="toolbar-user-menu"
      id="recycle-bin-link"
      dependencies={[available, title]}
    >
      {available ? (
        <li>
          <Link id="toolbar-recycle-bin" to="/@@recyclebin">
            {title}
            <Icon name={rightArrowSVG} size="24px" />
          </Link>
        </li>
      ) : null}
    </Plug>
  );
}

export default function RecycleBinUserMenuLink() {
  const available = useSelector((state: RootState) =>
    Boolean(
      state.actions?.actions?.user?.some(
        (action) => action.id === 'recyclebin',
      ),
    ),
  );

  return <RecycleBinUserMenuPlug available={available} />;
}
