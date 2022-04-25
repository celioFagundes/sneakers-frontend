module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#FF7D1B',
        secondary: '#FF8931',
        lightGray: '#FAF9F9',
        lightBlack: '#2B303A',
        darkBlack: '#121420',
        button: '#EDAE49',
        input: '#30638E',
      },
      fontFamily: {
        'kumbh-sans': ['"Kumbh Sans"', 'sans-serif'],
      },
      height: {
        450: '450px',
      },
      width: {
        420: '420px',
      },
      lineHeight: {
        'extra-loose': '2.5',
        12: '3rem',
      },
    },
  },
  plugins: [],
}
