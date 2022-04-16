module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      padding: ['hover'],
      colors:{
        blue:{
          450: '#5F99F7',
          666: '#3b7bbf'
        },
        brown:{
          500:'#684d68'
        },
        white:{
            100: '#d3d8e0'
        },
        grey:{
          100: '#838383'
      }
      }
    },
  },
  plugins: [],
}
