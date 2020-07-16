const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://prod.neucloudwebapp.me:5000',
      changeOrigin: true,
    })
  );
};