import type { ComponentType } from 'react';
import Pagination from '@plone/volto/components/theme/Pagination/Pagination';

export default Pagination as unknown as ComponentType<{
  current: number;
  total: number;
  onChangePage: (event: unknown, data: { value: number }) => void;
}>;
