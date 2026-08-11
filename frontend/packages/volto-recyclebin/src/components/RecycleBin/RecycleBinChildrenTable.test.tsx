import { fireEvent, render, screen } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import { MemoryRouter, useLocation } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';
import RecycleBinChildrenTable from './RecycleBinChildrenTable';

const TestIntlProvider = IntlProvider as any;

function LocationDisplay() {
  const location = useLocation();
  return <span data-testid="location">{location.search}</span>;
}

describe('RecycleBinChildrenTable', () => {
  it('uses Volto pagination to update the child batch query', () => {
    render(
      <TestIntlProvider locale="en">
        <MemoryRouter initialEntries={['/@@recyclebin/item?b_size=25']}>
          <RecycleBinChildrenTable
            items={[
              {
                id: 'child',
                title: 'Child item',
                '@type': 'Document',
                path: '/folder/child',
                restore_id: 'child-restore-id',
                language: 'en',
                review_state: 'private',
              },
            ]}
            itemsTotal={30}
            busy={false}
            onRestore={vi.fn()}
          />
          <LocationDisplay />
        </MemoryRouter>
      </TestIntlProvider>,
    );

    fireEvent.click(screen.getByText('2'));

    const params = new URLSearchParams(
      screen.getByTestId('location').textContent!,
    );
    expect(params.get('b_start')).toBe('25');
    expect(params.get('b_size')).toBe('25');
  });
});
