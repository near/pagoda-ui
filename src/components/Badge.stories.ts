import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import { Badge } from './Badge';

const meta = {
  title: 'Badge',
  component: Badge,
  parameters: {
    layout: 'centered', // https://storybook.js.org/docs/configure/story-layout
  },
  tags: ['autodocs'],
  args: { onClick: fn() },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    label: 'Badge',
    variant: 'primary',
  },
};
