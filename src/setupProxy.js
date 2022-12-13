const { createProxyMiddleware } = require('http-proxy-middleware');

const target = 'https://ccal.kyoko.finance';
// const target = 'http://localhost:8080';

module.exports = function(app) {
    app.use('/api', createProxyMiddleware({
            target,
            changeOrigin: true
        })
    );
};
