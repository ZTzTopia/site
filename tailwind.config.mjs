const { createThemes } = require('tw-colors');

function withOpacity(cssVariable) {
	return ({ opacityValue }) => {
		return opacityValue ? `rgba(var(${cssVariable}), ${opacityValue})` : `rgb(var(${cssVariable}))`
	}
}

const flexokiColors = {
	base: {
		black: '#100F0F',
		950: '#1C1B1A',
		900: '#282726',
		850: '#343331',
		800: '#403E3C',
		700: '#575653',
		600: '#6F6E69',
		500: '#878580',
		300: '#B7B5AC',
		200: '#CECDC3',
		150: '#DAD8CE',
		100: '#E6E4D9',
		50: '#F2F0E5',
		paper: '#FFFCF0',
	},
	red: {
		DEFAULT: '#AF3029',
		light: '#D14D41',
	},
	orange: {
		DEFAULT: '#BC5215',
		light: '#DA702C',
	},
	yellow: {
		DEFAULT: '#AD8301',
		light: '#D0A215',
	},
	green: {
		DEFAULT: '#66800B',
		light: '#879A39',
	},
	cyan: {
		DEFAULT: '#24837B',
		light: '#3AA99F',
	},
	blue: {
		DEFAULT: '#205EA6',
		light: '#4385BE',
	},
	purple: {
		DEFAULT: '#5E409D',
		light: '#8B7EC8',
	},
	magenta: {
		DEFAULT: '#A02F6F',
		light: '#CE5D97',
	},
}

/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			typography: ({ theme }) => ({
				DEFAULT: {
					css: {
						a: {
							color: theme('colors.tx-accent'),
							'&:hover': {
								color: theme('colors.tx-accent-hover')
							}
						},
						'--tw-prose-body': theme('colors.tx-normal'),
						'--tw-prose-headings': theme('colors.tx-normal'),
						'--tw-prose-invert-body': theme('colors.tx-normal'),
						'--tw-prose-invert-headings': theme('colors.tx-normal'),
					}
				}
			})
		}
	},
	plugins: [
		require('@tailwindcss/typography'),
		createThemes({
			'flexoki-dark': {
				'bg-primary': flexokiColors.base.black,
				'bg-secondary': flexokiColors.base['950'],
				'tx-accent': flexokiColors.cyan.light,
				'tx-accent-hover': flexokiColors.cyan.DEFAULT,
				'tx-normal': flexokiColors.base['200'],
				'tx-faint': flexokiColors.base['700'],
				'tx-muted': flexokiColors.base['500'],
				'ui-normal': flexokiColors.base['900'],
				'ui-hover': flexokiColors.base['850'],
				'ui-active': flexokiColors.base['800'],
				'selection': 'rgba(30, 95, 91, 0.3)'
			},
			'flexoki-light': {
				'bg-primary': flexokiColors.base.paper,
				'bg-secondary': flexokiColors.base['50'],
				'tx-accent': flexokiColors.cyan.DEFAULT,
				'tx-accent-hover': flexokiColors.cyan.light,
				'tx-normal': flexokiColors.base.black,
				'tx-faint': flexokiColors.base['300'],
				'tx-muted': flexokiColors.base['600'],
				'ui-normal': flexokiColors.base['100'],
				'ui-hover': flexokiColors.base['150'],
				'ui-active': flexokiColors.base['200'],
				'selection': 'rgba(187, 220, 206, 0.3)'
			}
		}, {
			produceCssVariable: (colorName) => `--twc-${colorName}`,
			produceThemeClass: (themeName) => `theme-${themeName}`,
			produceThemeVariant: (themeName) => `theme-${themeName}`,
			defaultTheme: {
				light: 'flexoki-dark',
				dark: 'flexoki-light'
			},
			strict: true
		})
	]
}