import { rem } from '@mantine/core';

export const getIconStyle = (size: number = 24): React.CSSProperties => ({
  width: rem(size),
  height: rem(size),
  display: 'block',
});
