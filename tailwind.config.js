/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // backgroundImage: {
      //   'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      //   'gradient-conic':
      //     'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      //     'background': "url('/bg.jpg')",
      //     'back-gif': "url('/bgGif.gif')",
      //     'backcosmo': "url('/cosmo.jpg')",
      // },
      screens: {
        'xs':  {'max': '480px'},  // Customize the small screen breakpoint
      }
    },
  },
  plugins: [require("daisyui")],
}
