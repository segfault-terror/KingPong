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
                'neon-bord': '0 0 30px rgba(255, 255, 255, 0.5)',
            },
            keyframes: {
                wiggle: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '100' },
                },
                playball: {
                    '0%': {
                        top: '22px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                    },
                    '10%': {
                        top: '50%',
                        left: '0',
                        transform: 'translateY(-58px) translateX(-50%)',
                    },
                    '20%': {
                        top: '100%',
                        left: '25%',
                        transform: 'translateY(-58px) translateX(-50%)',
                    },
                    '35%': {
                        top: '25%',
                        left: '100%',
                        transform: 'translateY(-58px) translateX(-50%)',
                    },
                    '40%': {
                        top: '22px',
                        left: '75%',
                        transform: 'translateX(-50%)',
                    },
                    '50%': {
                        top: '50%',
                        left: '100%',
                        transform: 'translateY(-58px) translateX(-50%)',
                    },
                    '60%': {
                        top: '100%',
                        left: '75%',
                        transform: 'translateY(-58px) translateX(-50%)',
                    },
                    '75%': {
                        top: '25%',
                        left: '0',
                        transform: 'translateY(-58px) translateX(-50%)',
                    },
                    '80%': {
                        top: '22px',
                        left: '25%',
                        transform: 'translateX(-50%)',
                    },
                    '90%': {
                        top: '50%',
                        left: '0',
                        transform: 'translateY(-58px) translateX(-50%)',
                    },
                    '100%': {
                        top: '100%',
                        left: '50%',
                        transform: 'translateX(-50%) translateY(-58px)',
                    },
                },
                moveTop: {
                    '0%': {
                        left: '50%',
                    },
                    '10%': {
                        left: '15%',
                    },
                    '20%': {
                        left: '25%',
                    },
                    '35%': {
                        left: '85%%',
                    },
                    '40%': {
                        left: '75%',
                    },
                    '50%': {
                        left: '85%',
                    },
                    '60%': {
                        left: '75%',
                    },
                    '75%': {
                        left: '15%',
                    },
                    '80%': {
                        left: '25%',
                    },
                    '90%': {
                        left: '15%',
                    },
                    '100%': {
                        left: '50%',
                    },
                },
                moveBottom: {
                    '0%': {
                        left: '50%',
                    },
                    '10%': {
                        left: '75%',
                    },
                    '20%': {
                        left: '25%',
                    },
                    '35%': {
                        left: '15%%',
                    },
                    '40%': {
                        left: '25%',
                    },
                    '50%': {
                        left: '15%',
                    },
                    '60%': {
                        left: '75%',
                    },
                    '75%': {
                        left: '85%',
                    },
                    '80%': {
                        left: '75%',
                    },
                    '90%': {
                        left: '85%',
                    },
                    '100%': {
                        left: '0%',
                    },
                },
            },
            animation: {
                wiggle: 'wiggle 1s ease-in-out delay-3s duration-3s',
                // moveball: 'moveball 1s ease-in-out infinite',
                playball: 'playball 10s linear infinite',
                moveTop: 'moveTop 10s linear infinite',
                moveBottom: 'moveBottom 10s linear infinite',
            },
        },
    },
    plugins: [],
};
export default config;
