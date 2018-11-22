module.exports = {
  devServer: {
    proxy: {
      "/api": {
        "target": "https://molgenis09.gcc.rug.nl"
      }
    }
  }
}