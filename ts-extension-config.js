const path = require("path");
const scssPlugin = require("./plugins/esbuildSsrScssModulesPlugin");

module.exports = {
  userScriptHeader: [
    ["@name", "Kiite cafe plus"],
    ["@version", "0.1.0"],
    ["@license", "MIT"],
    ["@author", "author"],
    ["@description", "kiite cafe Background playback and Continuous playback"],
    ["@description:ja", "kiite cafe バックグラウンド再生 連続再生"],
    ["@match", "https://cafe.kiite.jp/*"],
    ["@match", "https://embed.nicovideo.jp/kiite-embed-client"],
    ["@namespace", "https://yakisova.com"],
  ],
  devServer: {
    port: 5176,
    host: "localhost",
    websocket: 5175,
  },
  manifest: {
    name: "__MSG_Name__",
    short_name: "name",
    version: "0.1.0",
    manifest_version: 3,
    description: "__MSG_Description__",
    default_locale: "en",
  },
  locales: {
    ja: {
      Name: {
        message: "名前",
      },
      Description: {
        message: "説明",
      },
    },
    en: {
      Name: {
        message: "name",
      },
      Description: {
        message: "descruotion",
      },
    },
  },
  assetsDir: path.join(__dirname, "assets"),
  esBuild: {
    plugins: [scssPlugin()],
    target: "es2022",
    entryPoints: [path.join(__dirname, "src/index.ts")],
  },
};
