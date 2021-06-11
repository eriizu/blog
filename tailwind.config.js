module.exports = {
	mode: "jit",
	purge: {
		enabled: true,
		content: [
			"layouts/**/*.html"
		]
	},
	darkMode: "media", // or 'media' or 'class'
	theme: {
		extend: {},
	},
	variants: {
		extend: {},
	},
	plugins: [require('@tailwindcss/typography'),],
}
