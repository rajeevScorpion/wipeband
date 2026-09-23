/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        teal: {
          50: '#F0F9FA',
          100: '#E1F3F5',
          200: '#BDE3E8',
          500: '#0E616E',
          600: '#0B5561',
          700: '#0A4D57',
          800: '#073B43',
          900: '#052A30',
        },
        green: {
          50: '#F3FAF0',
          100: '#EEF7EA',
          200: '#D5EDCC',
          500: '#62B44A',
          600: '#539E3D',
          700: '#407D2E',
        },
        coral: {
          50: '#FFF5F4',
          100: '#FFF1EF',
          500: '#F36F6B',
          600: '#DE5652',
        },
        aqua: {
          50: '#F4FCFD',
          100: '#EEF9FA',
          400: '#66C5CD',
          500: '#3FAEB8',
        },
        amber: {
          400: '#FDB515',
          500: '#E59F08',
        },
        ink: '#123B42',
        muted: '#637A7E',
        border: '#DDE7E4',
        offwhite: '#FAFCFA',
        surface: {
          mint: '#EEF7EA',
          cream: '#FFF5DE',
          aqua: '#EEF9FA',
          coral: '#FFF1EF',
          card: '#F6FAF9',
        },
      },
      fontFamily: {
        heading: ['var(--font-nunito)', 'Nunito', 'sans-serif'],
        body: ['var(--font-inter)', 'Inter', 'sans-serif'],
      },
      maxWidth: {
        content: '1200px',
        wide: '1320px',
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
      boxShadow: {
        soft: '0 4px 20px -2px rgba(10, 77, 87, 0.06), 0 2px 6px -1px rgba(10, 77, 87, 0.04)',
        hover: '0 12px 32px -4px rgba(10, 77, 87, 0.12), 0 4px 12px -2px rgba(10, 77, 87, 0.06)',
      },
    },
  },
  plugins: [],
}
