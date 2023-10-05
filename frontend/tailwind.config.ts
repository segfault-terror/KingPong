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
                xxl: '1920px',
            },
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-conic':
                    'conic-gradient(from (180deg) at 50% 50%, var(--tw-gradient-stops))',
                gradient:
                    'conic-gradient(from 0deg, var(--inactive), var(--secondary))',
                points: 'url("/images/background-point.png")',
                aboutBg: 'url("/images/bg-about.svg")',
                default: 'url("/images/bg-new.svg")',
                borderLinear:
                    'linear-gradient(var(--gradient-angle)), var(--tw-gradient-from-position),var(--tw-gradient-to-position),var(--tw-gradient-to))',
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
                opponent: '#C44536',
                cube_palette: {
                    '200': '#E8D5B5',
                    '400': '#66ABFF',
                    '500': '#45144B',
                },
                silver: '#C6C6C6',
                pink: '#FF00FF',
            },
            fontFamily: {
                nicomoji: ['var(--font-nicomoji)', 'sans-serif'],
                jost: ['var(--font-jost)', 'sans-serif'],
                mulish: ['var(--font-mulish)', 'sans-serif'],
                jockey: ['var(--font-jockey-one)', 'sans-serif'],
            },
            dropShadow: {
                '3xl': '0 2px 2px rgba(255, 228, 134, 0.68)',
                'neon-white': '0 0 10px rgba(255, 255, 255, 0.5)',
                'neon-black': '0 0 20px rgba(0, 0, 0, 0.6)',
                'neon-orange': '-2px 0 8px rgba(255, 200, 45, 0.58)',
                'neon-bord': '0 0 30px rgba(255, 255, 255, 0.5)',
            },
            keyframes: {
                rotationColor: {
                    '0%': {
                        '--gradient-angle': '0deg',
                        background:
                            'conic-gradient(from var(--gradient-angle), var(--inactive), var(--secondary))',
                    },
                    '25%': {
                        '--gradient-angle': '90deg',
                        background:
                            'conic-gradient(from var(--gradient-angle), var(--inactive), var(--secondary))',
                    },
                    '50%': {
                        '--gradient-angle': '180deg',
                        background:
                            'conic-gradient(from var(--gradient-angle), var(--inactive), var(--secondary))',
                    },
                    '75%': {
                        '--gradient-angle': '270deg',
                        background:
                            'conic-gradient(from var(--gradient-angle), var(--inactive), var(--secondary))',
                    },
                    '100%': {
                        '--gradient-angle': '360deg',
                        background:
                            'conic-gradient(from var(--gradient-angle), var(--inactive), var(--secondary))',
                    },
                },
                TranslateLeft: {
                    '0%': { transform: 'translateX(50%)' },
                    '100%': { transform: 'translateX(0)' },
                },
                TranslateYDown: {
                    '0%': { transform: 'translateY(-50%)' },
                    '100%': { transform: 'translateY(0)' },
                },
                opacityUp: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '100' },
                },
                zoomin: {
                    '0%': { transform: 'scale(0)' },
                    '100%': { transform: 'scale(1)' },
                },
                zoomin2: {
                    '0%': { transform: 'scale(0.3)' },
                    '100%': { transform: 'scale(1)' },
                },
                waggle: {
                    '0%': { transform: 'opacity 0' },
                    '100%': { transform: 'opacity 1' },
                },
                blob: {
                    '0%': {
                        transform: 'translate(0px, 0px) scale(1)',
                    },
                    '33%': {
                        transform: 'translate(30px, -50px) scale(1.1)',
                    },
                    '66%': {
                        transform: 'translate(-20px, 20px) scale(0.9)',
                    },
                    '100%': {
                        transform: 'translate(0px, 0px) scale(1)',
                    },
                },
                rotation: {
                    '0%': {
                        transform: 'rotate(0deg)',
                    },
                    '100%': {
                        transform: 'rotate(360deg)',
                    },
                },
                dragR: {
                    '0%': {
                        justifySelf: 'start',
                    },
                    '100%': {
                        justifySelf: 'end',
                    },
                },
                dragL: {
                    '0%': {
                        justifySelf: 'end',
                    },
                    '100%': {
                        justifySelf: 'start',
                    },
                },
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
                        left: '80%',
                        transform: 'translateX(-50%) translateY(-20px)',
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
                        left: '15%',
                    },
                },
                ball: {
                    '0%': {
                        top: '34%',
                        left: '52%',
                    },
                    '8.3%': {
                        top: '52%',
                        left: '90%',
                    },
                    '24.9%': {
                        top: '85%',
                        left: '8%',
                    },
                    '30%': {
                        top: '98%',
                        left: '27%',
                    },
                    '41.5%': {
                        top: '70%',
                        left: '90%',
                    },
                    '58.1%': {
                        top: '55%',
                        left: '8%',
                    },
                    '74.7%': {
                        top: '13%',
                        left: '90%',
                    },
                    '79%': {
                        top: '1%',
                        left: '70%',
                    },
                    '91.3%': {
                        top: '22%',
                        left: '8%',
                    },
                    '100%': {
                        top: '34%',
                        left: '52%',
                    }
                },
                Ping: {
                    '0%': {
                        top: '10%',
                    },
                    '5%': {
                        top: '10%',
                    },
                    '9%': {
                        top: '24%',
                    },
                    '13%': {
                        top: '17%',
                    },
                    '24.9%': {
                        top: '82%',
                    },
                    '47%': {
                        top: '37%',
                    },
                    '52%': {
                        top: '41%',
                    },
                    '56%': {
                        top: '64%',
                    },
                    '58.1%': {
                        top: '44%',
                    },
                    '70%': {
                        top: '55%',
                    },
                    '84%': {
                        top: '12%',
                    },
                    '91.3%': {
                        top: '18%',
                    },
                    '100%': {
                        top: '10%',
                    },
                },
                pong: {
                    '0%': {
                        top: '80%',
                    },
                    '8.3%': {
                        top: '51%',
                    },
                    '20%': {
                        top: '60%',
                    },
                    '25%': {
                        top: '34%',
                    },
                    '41.5%': {
                        top: '68%',
                    },
                    '46%': {
                        top: '36%',
                    },
                    '52%': {
                        top: '18%',
                    },
                    '58.1%': {
                        top: '53%',
                    },
                    '66%': {
                        top: '14%',
                    },
                    '70%': {
                        top: '20%',
                    },
                    '74.7%': {
                        top: '10%',
                    },
                    '91.3%': {
                        top: '10%',
                    },
                    '100%': {
                        top: '80%',
                    },
                },
                // Matchmaking page - Mobile animations
                'slide-down-gate': {
                    '0%': { transform: 'translateY(0)' },
                    '100%': { transform: 'translateY(35%)' },
                },
                'slide-up-gate': {
                    '0%': { transform: 'translateY(0)' },
                    '100%': { transform: 'translateY(-35%)' },
                },
                'slide-down-opponent': {
                    '0%': { transform: 'translateY(0)' },
                    '100%': { transform: 'translateY(60%)' },
                },
                'slide-up-player': {
                    '0%': { transform: 'translateY(0)' },
                    '100%': { transform: 'translateY(-60%)' },
                },
                // Matchmaking page - Desktop animations
                'slide-left-gate': {
                    '0%': { transform: 'translateX(0)' },
                    '100%': { transform: 'translateX(-35%)' },
                },
                'slide-right-gate': {
                    '0%': { transform: 'translateX(0)' },
                    '100%': { transform: 'translateX(35%)' },
                },
                'slide-left-player': {
                    '0%': { transform: 'translateX(0)' },
                    '100%': { transform: 'translateX(-90%)' },
                },
                'slide-right-opponent': {
                    '0%': { transform: 'translateX(0)' },
                    '100%': { transform: 'translateX(90%)' },
                },

                'matchmaking-loading-dot': {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-10px)' },
                },
            },
            animation: {
                wiggle: 'wiggle 6s ease-in-out',
                blob: 'blob 7s ease-in-out  infinite',
                blob1: 'blob 8s ease-in-out infinite',
                blob2: 'blob 10s ease-in-out infinite',
                playball: 'playball 5s linear infinite',
                moveTop: 'moveTop 5s linear infinite',
                moveBottom: 'moveBottom 5s linear infinite',
                'slide-down-gate': 'slide-down-gate 200ms ease-out forwards 1s',
                'slide-up-gate': 'slide-up-gate 200ms ease-out forwards 1s',
                'slide-down-opponent':
                    'slide-down-opponent 200ms ease-out forwards 1s',
                'slide-up-player': 'slide-up-player 200ms ease-out forwards 1s',
                'slide-left-gate': 'slide-left-gate 200ms ease-out forwards 1s',
                'slide-right-gate':
                    'slide-right-gate 200ms ease-out forwards 1s',
                'slide-left-player':
                    'slide-left-player 200ms ease-out forwards 1s',
                'slide-right-opponent':
                    'slide-right-opponent 200ms ease-out forwards 1s',

                'first-dot':
                    'matchmaking-loading-dot 1s ease-in-out 0ms infinite',
                'second-dot':
                    'matchmaking-loading-dot 1s ease-in-out 150ms infinite',
                'third-dot':
                    'matchmaking-loading-dot 1s ease-in-out 300ms infinite',
                opacityUp: 'opacityUp 1s ease-in-out 1000ms 1',
                'rotation-color': 'rotationColor 3s linear infinite',
                LoadingBall: 'ball 6s linear infinite',
                LoadingPing: 'Ping 6s linear infinite',
                LoadingPong: 'pong 6s linear infinite',
            },
            addComponents: {},
        },
    },
    plugins: [require('tailwind-scrollbar')],
};
export default config;
