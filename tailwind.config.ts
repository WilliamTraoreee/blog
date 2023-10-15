import type { Config } from 'tailwindcss';

export default {
	content: ['./app/**/*.{js,jsx,ts,tsx}'],
	theme: {
		extend: {
			fontFamily: {
				sans: ['Supreme', 'sans-serif'],
			},
			colors: {
				dark: {
					50: '#72727D',
					100: '#565660',
					200: '#3A3A43',
					300: '#2A2A30',
					400: '#19191D',
					500: '#0F0F12',
					600: '#0D0D10',
					700: '#08080A',
					800: '#030304',
					900: '#020202',
				},
				social: {
					spotify: '#1DB954',
					twitch: '#9146FF',
					youtube: '#CD201F',
				},
			},
		},
	},
	plugins: [],
} satisfies Config;
