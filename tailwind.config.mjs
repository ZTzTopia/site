/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	darkMode: 'selector',
	theme: {
		extend: {
			typography: ({ theme }) => ({
				DEFAULT: {
					css: {
						'--tw-prose-body': theme('colors.flexoki.base.black'),
						'--tw-prose-headings': theme('colors.flexoki.base.black'),
						'--tw-prose-code': theme('colors.flexoki.cyan.600'),
						'--tw-prose-quotes': theme('colors.flexoki.base.850'),
						'--tw-prose-quote-borders': theme('colors.flexoki.cyan.600'),

						'--tw-prose-invert-body': theme('colors.flexoki.base.200'),
						'--tw-prose-invert-headings': theme('colors.flexoki.base.200'),
						'--tw-prose-invert-code': theme('colors.flexoki.cyan.400'),
						'--tw-prose-invert-quotes': theme('colors.flexoki.base.400'),
						'--tw-prose-invert-quote-borders': theme('colors.flexoki.cyan.400'),
					}
				}
			})
		}
	}
}