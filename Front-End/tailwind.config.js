// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{html,ts}", // Add paths to all templates and components
  ],
  theme: {
    extend: {
      backgroundImage: {
        'bannerHeader-bg': "url('/assets/banner.png')", 
      },


      spacing: {
        'card_home_container_h': '45rem',
        'card_home_container_w': '80rem',
      }
    },
  },
  plugins: [],
};
