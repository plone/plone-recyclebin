import { render, screen } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import {
  Pluggable,
  PluggablesProvider,
} from '@plone/volto/components/manage/Pluggable';
import { RecycleBinUserMenuPlug } from './RecycleBinUserMenuLink';

const TestIntlProvider = IntlProvider as any;

function renderUserMenuPlug(available: boolean) {
  render(
    <TestIntlProvider locale="en">
      <MemoryRouter>
        <PluggablesProvider>
          <ul>
            <Pluggable name="toolbar-user-menu" />
          </ul>
          <RecycleBinUserMenuPlug available={available} />
        </PluggablesProvider>
      </MemoryRouter>
    </TestIntlProvider>,
  );
}

describe('RecycleBinUserMenuPlug', () => {
  it('links to the recycle bin when the user action is available', async () => {
    renderUserMenuPlug(true);

    const link = await screen.findByRole('link', { name: 'Recycle bin' });
    expect(link.getAttribute('href')).toBe('/@@recyclebin');
    expect(link.closest('li')).not.toBeNull();
  });

  it('does not render a link without the permitted user action', () => {
    renderUserMenuPlug(false);

    expect(screen.queryByRole('link', { name: 'Recycle bin' })).toBeNull();
  });
});
