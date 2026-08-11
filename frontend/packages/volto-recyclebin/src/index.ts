import type { ConfigType } from '@plone/registry';
import installSettings from './config/settings';
import './theme/recycle-bin.less';

function applyConfig(config: ConfigType) {
  installSettings(config);

  return config;
}

export default applyConfig;
