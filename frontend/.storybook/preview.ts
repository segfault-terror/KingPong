import type { Preview } from '@storybook/react';
import '../src/app/globals.css';

const preview: Preview = {
    parameters: {
        actions: { argTypesRegex: '^on[A-Z].*' },
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/,
            },
        },
        backgrounds: {
            values: [
                {
                    name: 'kingpong',
                    value: '#250A3B',
                },
                {
                    name: 'about',
                    value: '#0F5262',
                },
            ],
        },
    },
};

export default preview;
