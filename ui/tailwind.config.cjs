/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
module.exports = {
	jit: true,
	// overrides any other third party css toolkit
	important: true,
	content: [
		'./index.html',
		'./src/**/*.{js,jsx}',
		'./node_modules/tw-elements/dist/js/**/*.js'
	],
	theme: {
		extend: {
			colors: {
				'lnh-yellow': {
					DEFAULT: '#E9F97A',
				},
				'lnh-lightGrey': {
					DEFAULT: '#F2F2F2',
				},
				'lnh-darkGrey': {
					DEFAULT: '#878787',
				},
				'lnh-midGrey': {
					DEFAULT: '#D8D8D8',
				},
				'lnh-red': {
					DEFAULT: '#FE4971',
				},
				'lnh-black': {
					DEFAULT: '#000000',
					100: '#C5C5C5',
				},
			},
		},
	},
	plugins: [
		require('tw-elements/dist/plugin'),
		require('@tailwindcss/line-clamp')
	],
};
