import type { ComponentType } from 'react';
import { IntlProvider } from 'react-intl';
import { MemoryRouter } from 'react-router-dom';
import { recycleBinFixture } from './fixtures';
import RecycleBinListing from './RecycleBinListing';

// react-intl 3's declarations predate React 18's explicit children typing.
const StoryIntlProvider = IntlProvider as any;

const meta = {
  title: 'Recycle bin/Listing',
  component: RecycleBinListing,
  decorators: [
    (Story: ComponentType) => (
      <StoryIntlProvider locale="en">
        <MemoryRouter>
          <Story />
        </MemoryRouter>
      </StoryIntlProvider>
    ),
  ],
  parameters: { layout: 'fullscreen' },
  args: {
    recycleBin: recycleBinFixture,
    queryState: {},
    busy: false,
    onRestore: () => undefined,
    onPurge: () => undefined,
    onEmpty: () => undefined,
  },
};

export default meta;

export const Populated = {};

export const Empty = {
  args: {
    recycleBin: { ...recycleBinFixture, items_total: 0, items: [] },
  },
};

export const FilteredEmpty = {
  args: {
    recycleBin: { ...recycleBinFixture, items_total: 0, items: [] },
    queryState: { title: 'Missing document' },
  },
};

export const PartialFailure = {
  args: {
    operationMessage: {
      text: 'One item was restored, and one item failed.',
      error: true,
      failures: [
        { id: 'second-item', message: 'The destination is occupied.' },
      ],
    },
  },
};
