module.exports = {
  purge: { content: ["./public/**/*.html", "./src/**/*.vue"] },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      borderWidth: {
      '1': '1px'
      }
    },
  },
  variants: {
    extend: {
      
    },
  },
  plugins: [],
};
