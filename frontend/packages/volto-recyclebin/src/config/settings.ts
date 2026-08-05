import type { ConfigType } from '@plone/registry';
import RecycleBinItemView from '../components/RecycleBin/RecycleBinItemView';
import RecycleBinView from '../components/RecycleBin/RecycleBinView';
import { recycleBin } from '../reducers';

export default function install(config: ConfigType) {
  config.addonReducers = {
    ...config.addonReducers,
    recycleBin,
  };

  config.addonRoutes = [
    {
      path: '/@@recyclebin/:id',
      component: RecycleBinItemView,
      exact: true,
    },
    {
      path: '/@@recyclebin',
      component: RecycleBinView,
      exact: true,
    },
    {
      path: '/controlpanel/recycle-bin',
      component: RecycleBinView,
      exact: true,
    },
    ...config.addonRoutes,
  ];

  config.settings.nonContentRoutes = [
    ...config.settings.nonContentRoutes,
    /\/@@recyclebin(?:\/.*)?$/,
  ];

  config.settings.controlpanels = [
    ...config.settings.controlpanels,
    {
      '@id': '/recycle-bin',
      group: 'Add-on Configuration',
      title: 'Recycle bin',
    },
  ];

  return config;
}
