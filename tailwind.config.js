/* Pour régénérer styles.css avec le vrai Tailwind CLI :
   ./tailwindcss -c tailwind.config.js -i input.css -o styles.css --minify */
module.exports = {
  darkMode: 'class',
  content: ['./index.html'],
  theme: { extend: { colors: { medical: {
    50: '#f0f9ff', 100: '#e0f2fe', 500: '#0284c7', 600: '#0369a1', 700: '#075985', 900: '#0c4a6e'
  } } } },
  plugins: []
}
