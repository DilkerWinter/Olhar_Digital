module.exports = {
  content: [
    "./src/**/*.{html,ts}", 
  ],
  theme: {
    extend: {
      backgroundImage: {
        'bannerHeader-bg': "url('/assets/banner.png')", 
        'bannerHeader2': "url('/assets/bannerImg.jpg')",
      },


      spacing: {
        'card_home_container_h': '35rem',
        'header_spacing': '14rem',
      }
    },
  },
  plugins: [],
};
