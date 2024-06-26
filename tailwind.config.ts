import type { Config } from 'tailwindcss';

export default {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@tremor/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    transparent: 'transparent',
    current: 'currentColor',
    extend: {
      colors: {
        'brand': '#05D5BF',
        // 'default-border': '#D4DEDB',
        // 'primary-text': '#425752',
        // light mode
        tremor: {
          brand: {
            faint: '#eff6ff', // blue-50
            muted: '#05D5BF', // blue-200
            subtle: '#60a5fa', // blue-400
            // DEFAULT: '#0B0F0D', // blue-500
            DEFAULT: '#3b82f6', // blue-500
            emphasis: '#1d4ed8', // blue-700
            inverted: '#ffffff' // white
          },
          background: {
            muted: '#f9fafb', // gray-50
            subtle: '#f3f4f6', // gray-100
            DEFAULT: '#ffffff', // white
            emphasis: '#374151' // gray-700
          },
          border: {
            DEFAULT: '#e5e7eb' // gray-200
          },
          ring: {
            DEFAULT: '#e5e7eb' // gray-200
          },
          content: {
            subtle: '#9ca3af', // gray-400
            DEFAULT: '#6b7280', // gray-500
            emphasis: '#374151', // gray-700
            strong: '#111827', // gray-900
            inverted: '#ffffff' // white
          }
        }
      },      
      minWidth: {
        'xs': '350px',
        'sm': '768px',
        'md': '992px',
        'lg': '1200px'
      },
      maxWidth: {
        'xs': '350px',
        'sm': '768px',
        'md': '992px',
        'lg': '1200px'
      },
      width: {
        'xs': '350px',
        'sm': '768px',
        'md': '992px',
        'lg': '1200px'
      },
      borderColor: {
        'default': '#D4DEDB',
        'brand': {
          'DEFAULT': '#05D5BF',
          '300': '#048B7E',
          '400': '#036359',
          '600': '#04B7A6',
        },
        'surface': {
          'DEFAULT': '#F1F4F3',
          '50': '#F9FAFA',
          '400': '#C5D3CF',
          '600': '#CAD1CF',
          '800': '#A8BDB7'
        },
      },
      textColor: {
        'primary': '#0B0F0D',
        'secondary': '#425752',
        'tertiary': '#58746D',
        'brand': {
          'DEFAULT': '#05D5BF',
          '300': '#048B7E',
          '400': '#036359',
          '600': '#04B7A6',
        },
        'surface': {
          'DEFAULT': '#F1F4F3',
          '50': '#F9FAFA',
          '400': '#C5D3CF',
          '600': '#CAD1CF',
          '800': '#A8BDB7'
        },
      },
      backgroundColor: {
        'brand': {
          'DEFAULT': '#05D5BF',
          '300': '#048B7E',
          '400': '#036359',
          '600': '#04B7A6',
        },
        'surface': {
          'DEFAULT': '#F1F4F3',
          '50': '#F9FAFA',
          '400': '#C5D3CF',
          '600': '#CAD1CF',
          '800': '#A8BDB7'
        },
      },
      ringColor: {
        'brand': {
          'DEFAULT': '#05D5BF',
          '300': '#048B7E',
          '400': '#036359',
          '600': '#04B7A6',
        },
        'surface': {
          'DEFAULT': '#F1F4F3',
          '50': '#F9FAFA',
          '400': '#C5D3CF',
          '600': '#CAD1CF',
          '800': '#A8BDB7'
        },
      },
      fill: {
        'primary': '#0B0F0D',
        'brand': {
          'DEFAULT': '#05D5BF',
          '300': '#048B7E',
          '400': '#036359',
          '600': '#04B7A6',
        },
        'secondary': '#A8BDB7'
      },
      accent: {
        'brand': {
          'DEFAULT': '#05D5BF',
          '300': '#048B7E',
          '400': '#036359',
          '600': '#04B7A6',
        },
      },
      boxShadow: {
        // light
        'tremor-input': '0 1px 2px 0 rgb(0 0 0 / 0.05)',
        'tremor-card':
          '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
        'tremor-dropdown':
          '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)'
      },
      borderRadius: {
        'tremor-small': '0.375rem',
        'tremor-default': '0.5rem',
        'tremor-full': '9999px'
      },
      fontSize: {
        'tremor-label': '0.75rem',
        'tremor-default': ['0.875rem', { lineHeight: '1.25rem' }],
        'tremor-title': ['1.125rem', { lineHeight: '1.75rem' }],
        'tremor-metric': ['1.875rem', { lineHeight: '2.25rem' }]
      }
    }
  },
  safelist: [
    {
      pattern:
        /^(bg-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
      variants: ['hover', 'ui-selected']
    },
    {
      pattern:
        /^(text-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
      variants: ['hover', 'ui-selected']
    },
    {
      pattern:
        /^(border-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
      variants: ['hover', 'ui-selected']
    },
    {
      pattern:
        /^(ring-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/
    },
    {
      pattern:
        /^(stroke-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/
    },
    {
      pattern:
        /^(fill-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/
    }
  ],
  plugins: [require('@headlessui/tailwindcss')]
} satisfies Config;
