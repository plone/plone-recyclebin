import { fireEvent, render, screen } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import { MemoryRouter, useLocation } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';
import { recycleBinFixture } from './fixtures';
import RecycleBinListing from './RecycleBinListing';

// react-intl 3's declarations predate React 18's explicit children typing.
const TestIntlProvider = IntlProvider as any;

function LocationDisplay() {
  const location = useLocation();
  return <span data-testid="location">{location.search}</span>;
}

function renderListing(recycleBin = recycleBinFixture, onRestore = vi.fn()) {
  render(
    <TestIntlProvider locale="en">
      <MemoryRouter>
        <RecycleBinListing
          recycleBin={recycleBin}
          queryState={{}}
          busy={false}
          onRestore={onRestore}
          onPurge={vi.fn()}
          onEmpty={vi.fn()}
        />
      </MemoryRouter>
    </TestIntlProvider>,
  );
  return onRestore;
}

describe('RecycleBinListing', () => {
  it('renders deleted items and restores the selected rows', () => {
    const onRestore = renderListing();

    expect(screen.getByText('Archived project notes')).toBeTruthy();
    expect(screen.getByText('Retired campaign')).toBeTruthy();

    fireEvent.click(screen.getByLabelText('Select Archived project notes'));
    fireEvent.click(screen.getByRole('button', { name: 'Restore selected' }));

    expect(onRestore).toHaveBeenCalledWith(['first-item']);
  });

  it('distinguishes an empty bin from filtered empty results', () => {
    const empty = { ...recycleBinFixture, items_total: 0, items: [] };
    const { rerender } = render(
      <TestIntlProvider locale="en">
        <MemoryRouter>
          <RecycleBinListing
            recycleBin={empty}
            queryState={{}}
            busy={false}
            onRestore={vi.fn()}
            onPurge={vi.fn()}
            onEmpty={vi.fn()}
          />
        </MemoryRouter>
      </TestIntlProvider>,
    );
    expect(screen.getByText('The recycle bin is empty.')).toBeTruthy();

    rerender(
      <TestIntlProvider locale="en">
        <MemoryRouter>
          <RecycleBinListing
            recycleBin={empty}
            queryState={{ title: 'missing' }}
            busy={false}
            onRestore={vi.fn()}
            onPurge={vi.fn()}
            onEmpty={vi.fn()}
          />
        </MemoryRouter>
      </TestIntlProvider>,
    );
    expect(
      screen.getByText('No items match the current filters.'),
    ).toBeTruthy();
  });

  it('uses Volto pagination to update the batch query', () => {
    render(
      <TestIntlProvider locale="en">
        <MemoryRouter initialEntries={['/@@recyclebin?b_size=25']}>
          <RecycleBinListing
            recycleBin={{ ...recycleBinFixture, items_total: 52 }}
            queryState={{ b_size: '25' }}
            busy={false}
            onRestore={vi.fn()}
            onPurge={vi.fn()}
            onEmpty={vi.fn()}
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
