import '../src/styles/globals.css';
import '../src/styles/theme.css';

import React from 'react';
import type { Preview } from '@storybook/react';

const preview: Preview = {
  decorators: [
    (Story) => {
      return <Story />;
    },
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
