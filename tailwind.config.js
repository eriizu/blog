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
		extend: {
			typography: {
				DEFAULT: {
					css: {
						p: {
							color: "#1F2937"
						},
					},
				},
			}
		},
	},
	variants: {
		extend: {},
	},
	plugins: [require('@tailwindcss/typography'),],
}
