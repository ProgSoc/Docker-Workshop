import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'timer-green': "#42f548",
        'timer-red': "#f54242",
        'timer-default': "#ffffff",
      }
    },
  },
  plugins: [],
}
export default config
