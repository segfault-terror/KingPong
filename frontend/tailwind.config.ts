import type { Config } from 'tailwindcss';

const config: Config = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
        './src/stories/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            screens: {
                    sm: '375px',
                    md: '650px',
                    lg: '1024px',
                    xl: '1440px',
                },
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-conic':
                    'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
                points: 'url("/images/background-point.png")',
            },
            keyframes: {
                wiggle: {
                  '0%': { opacity: '0' },
                  '100%': { opacity: '100'  },
                },
              },
            colors: {
                primary: '#4F1754',
                secondary: {
                    '200': '#FFE72D',
                    '500': '#FFA82A',
                },
                background: '#250A3B',
                inactive: {
                    '200': '#6A6A6A',
                    '500': '#302F2F',
                },
                online: '#03CE18',
                offline: '#302F2F',
                ingame: '#FF650B',
                cube_palette: {
                    '200': '#E8D5B5',
                    '400': '#66ABFF',
                    '500': '#45144B',
                },
                silver: '#C6C6C6',
            },
            fontFamily: {
                nicomoji: ['var(--font-nicomoji)', 'sans-serif'],
                jost: ['var(--font-jost)', 'sans-serif'],
                mulish: ['var(--font-mulish)', 'sans-serif'],
            },
            dropShadow: {   
                '3xl': '0 2px 2px rgba(255, 228, 134, 0.68)',
                'neon-white': '0 0 10px rgba(255, 255, 255, 0.5)',
                'neon-black': '0 0 20px rgba(0, 0, 0, 0.6)',
                'neon-orange': '-2px 0 8px rgba(255, 200, 45, 0.58)',
                'neon-bord': '0 0 30px rgba(255, 255, 255, 0.5)'
            },
            animation: {
                wiggle: 'wiggle 1s ease-in-out delay-3s duration-3s',
                // moveball: 'moveball 1s ease-in-out infinite',
            },
        },
    },
    plugins: [],
};
export default config;
