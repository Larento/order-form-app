/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
	theme: {
		screens: {
			sm: '768px',
			md: '1024px',
			lg: '1440px',
		},
		extend: {
			fontFamily: {
				sans: ['Inter', 'sans-serif'],
			},
		},
	},
	plugins: [
		function ({ addVariant }) {
			addVariant('initial', 'html :where(&)');
		},
	],
};
