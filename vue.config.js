const { defineConfig } = require("@vue/cli-service");
// module.exports = defineConfig({
//   transpileDependencies: true,
// });

module.exports = {
  devServer: {
    allowedHosts: [
      'localhost',
      'receptionrobot.net',
      '192.168.1.1',
    ],
  },
};
