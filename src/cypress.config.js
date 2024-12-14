const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://neighbor-bk.vercel.app', // URL gốc của trang web
    supportFile: 'cypress/support/index.js',  // Đường dẫn đến file support
    fixturesFolder: 'cypress/fixtures',       // Đường dẫn đến thư mục fixtures
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}', // Mẫu file kiểm thử
    viewportWidth: 1280,                      // Kích thước màn hình kiểm thử
    viewportHeight: 720,

    supportFile: 'cypress/support/e2e.js', // Đường dẫn file hỗ trợ
  },
});
