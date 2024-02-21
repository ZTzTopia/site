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

const obsidianColors = {
	base: {
		0: {
			DEFAULT: '#1e1e1e',
			light: '#ffffff'
		},
		5: {
			DEFAULT: '#212121',
			light: '#f2f2f2'
		},
		10: {
			DEFAULT: '#242424',
			light: '#fafafa'
		},
		20: {
			DEFAULT: '#262626',
			light: '#f6f6f6'
		},
		25: {
			DEFAULT: '#2a2a2a',
			light: '#e3e3e3'
		},
		30: {
			DEFAULT: '#363636',
			light: '#e0e0e0'
		},
		35: {
			DEFAULT: '#3f3f3f',
			light: '#d4d4d4'
		},
		40: {
			DEFAULT: '#555555',
			light: '#bdbdbd'
		},
		50: {
			DEFAULT: '#666666',
			light: '#ababab'
		},
		60: {
			DEFAULT: '#999999',
			light: '#707070'
		},
		70: {
			DEFAULT: '#bababa',
			light: '#5a5a5a'
		},
		100: {
			DEFAULT: '#dadada',
			light: '#222222'
		},
	},
	red: {
		DEFAULT: '#fb464c',
		light: '#e93147'
	},
	orange: {
		DEFAULT: '#ec7500',
		light: '#e9973f'
	},
	yellow: {
		DEFAULT: '#e0ac00',
		light: '#e0de71'
	},
	green: {
		DEFAULT: '#08b94e',
		light: '#44cf6e'
	},
	cyan: {
		DEFAULT: '#00bfbc',
		light: '#53dfdd'
	},
	blue: {
		DEFAULT: '#086ddd',
		light: '#027aff'
	},
	purple: {
		DEFAULT: '#7852ee',
		light: '#a882ff'
	},
	pink: {
		DEFAULT: '#d53984',
		light: '#fa99cd'
	},
	'accent-hsl': {
		h: 258,
		s: '88%',
		l: '66%'
	},
	accent: {
		DEFAULT: `hsl(254, 80%, 68%)`,
		// 1: `hsl(${}, calc(80% * 1.02), calc(68% * 1.15))`,
		// 2: `hsl(calc(254 - 5), calc(80% * 1.05), calc(68% * 1.29))`,
	}
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
								color: theme('colors.tx-accent-hover'),
							},
						},

						'--tw-prose-body': theme('colors.tx-normal'),
						'--tw-prose-headings': theme('colors.tx-normal'),
						'--tw-prose-lead': theme('colors.tx-normal'),
						'--tw-prose-links': theme('colors.tx-accent'),
						'--tw-prose-bold': theme('colors.tx-normal'),
						'--tw-prose-counters': theme('colors.tx-normal'),
						'--tw-prose-bullets': theme('colors.tx-normal'),
						'--tw-prose-hr': theme('colors.tx-normal'),
						'--tw-prose-quotes': theme('colors.tx-normal'),
						'--tw-prose-quote-borders': theme('colors.tx-normal'),
						'--tw-prose-captions': theme('colors.tx-normal'),
						'--tw-prose-code': theme('colors.tx-normal'),
						'--tw-prose-pre-code': theme('colors.tx-normal'),
						'--tw-prose-pre-bg': theme('colors.tx-normal'),
						'--tw-prose-th-borders': theme('colors.tx-normal'),
						'--tw-prose-td-borders': theme('colors.tx-normal'),

						'--tw-prose-invert-body': theme('colors.tx-normal'),
						'--tw-prose-invert-headings': theme('colors.tx-normal'),
						'--tw-prose-invert-lead': theme('colors.tx-normal'),
						'--tw-prose-invert-links': theme('colors.tx-accent'),
						'--tw-prose-invert-bold': theme('colors.tx-normal'),
						'--tw-prose-invert-counters': theme('colors.tx-normal'),
						'--tw-prose-invert-bullets': theme('colors.tx-normal'),
						'--tw-prose-invert-hr': theme('colors.tx-normal'),
						'--tw-prose-invert-quotes': theme('colors.tx-normal'),
						'--tw-prose-invert-quote-borders': theme('colors.tx-normal'),
						'--tw-prose-invert-captions': theme('colors.tx-normal'),
						'--tw-prose-invert-code': theme('colors.white'),
						'--tw-prose-invert-pre-code': theme('colors.tx-normal'),
						'--tw-prose-invert-pre-bg': 'rgb(0 0 0 / 50%)',
						'--tw-prose-invert-th-borders': theme('colors.tx-normal'),
						'--tw-prose-invert-td-borders': theme('colors.tx-normal'),
					},
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
			},
			'obsidian-dark': {
				'bg-primary': obsidianColors.base['0'].DEFAULT,
				'bg-secondary': obsidianColors.base['20'].DEFAULT,
				'tx-accent': obsidianColors.accent,
				'tx-accent-hover': obsidianColors.accent['2'],
				'tx-normal': obsidianColors.base['100'].DEFAULT,
				'tx-faint': obsidianColors.base['50'].DEFAULT,
				'tx-muted': obsidianColors.base['70'].DEFAULT,
				'ui-normal': obsidianColors.base['30'].DEFAULT,
				'ui-hover': obsidianColors.base['35'].DEFAULT,
				'ui-active': obsidianColors.base['40'].DEFAULT
			},
			'obsidian-light': {
				'bg-primary': obsidianColors.base['0'].light,
				'bg-secondary': obsidianColors.base['20'].light,
				'tx-accent': obsidianColors.accent.DEFAULT,
				'tx-accent-hover': obsidianColors.accent['2'],
				'tx-normal': obsidianColors.base['100'].light,
				'tx-faint': obsidianColors.base['50'].light,
				'tx-muted': obsidianColors.base['70'].light,
				'ui-normal': obsidianColors.base['30'].light,
				'ui-hover': obsidianColors.base['35'].light,
				'ui-active': obsidianColors.base['40'].light
			},
		}, {
			produceCssVariable: (colorName) => `--twc-${colorName}`,
			produceThemeClass: (themeName) => `theme-${themeName}`,
			produceThemeVariant: (themeName) => `theme-${themeName}`,
			defaultTheme: {
				light: 'flexoki-light',
				dark: 'flexoki-dark'
			},
			strict: true
		})
	]
}
