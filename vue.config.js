module.exports = {
    baseUrl: process.env.NODE_ENV === 'production' ? '/bondpub/' : '/',
    devServer: {
        disableHostCheck: true,
        public: '9bcbd7885bf5483aa93a480b021c17cd.vfs.cloud9.eu-west-1.amazonaws.com'
    },
}