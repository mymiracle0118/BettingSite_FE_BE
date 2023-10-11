let mix = require('laravel-mix');

const resourceRoot = '/public/static/front'
const publicPath = '/public/static/front/'

// const resourceRoot = 'https://theme-assets.s3.eu-west-1.amazonaws.com/v2/public'
// const publicPath = 'https://theme-assets.s3.eu-west-1.amazonaws.com/v2/public/'

// setResroucesRoots add prefix to url() in scss on example: from /images/close.svg to /static/images/close.svg
mix.setResourceRoot(resourceRoot)

// Path where mix-manifest.json is created
mix.setPublicPath('../../public/static/front')

mix.webpackConfig({
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            '@': __dirname + '/src/',
        },
    },
    output: {
        publicPath: publicPath,
        // filename: '[name].[contenthash].js',
        // chunkFilename: '[name].[contenthash].js',
    },
    optimization: {
        runtimeChunk: 'single',
          splitChunks: {
            chunks: 'all',
            maxInitialRequests: Infinity,
            minSize: 0,
            cacheGroups: {
                dev: {
                    test: /[\\/]node_modules[\\/](axios|bootstrap|cross-env|jquery|laravel-mix|lodash|popper.js|resolve-url-loader|sass|sass-loader|vue-template-compiler|es6-promise)[\\/]/,
                    name: "/js/dev"
                },
                vendor1: {
                    test: /[\\/]node_modules[\\/](vue|vue-axios|vue-cookies|vue-localstorage|vue-router|vuex)[\\/]/,
                    name: "/js/vendor1"
                },
                vendor2: {
                    test: /[\\/]node_modules[\\/](moment|moment-timezone|vue2-datepicker|vue2-filters|vuejs-paginate|v-click-outside)[\\/]/,
                    name: "/js/vendor2"
                },
                vendor3: {
                    test: /[\\/]node_modules[\\/](bootstrap-vue)[\\/]/,
                    name: "/js/vendor3"
                },
                vendor4: {
                    test: /[\\/]node_modules[\\/](vue-json-excel|jspdf|jspdf-autotable|vee-validate|crypto-js|crypto)[\\/]/,
                    name: "/js/vendor4"
                },
                vendor5: {
                    test: /[\\/]node_modules[\\/](nanoid|vue-drag-resize|vue-google-charts|vue-slick-carousel)[\\/]/,
                    name: "/js/vendor5"
                },
                vendor: {
                    test: /[\\/]node_modules[\\/](!nanoid)(!vue-drag-resize)(!vue-google-charts)(!vue-slick-carousel)(!resolve-url-loader)(!vue)(!axios)(!vue-axios)(!vue-cookies)(!vue-localstorage)(!vue-router)(!vue2-datepicker)(!vue2-filters)(!vuejs-paginate)(!vuex)(!bootstrap)(!popper.js)(!sass-loader)(!sass)(!vue-template-compiler)(!laravel-mix)(!cross-env)(!bootstrap-vue)(!jquery)(!lodash)(!moment)(!moment-timezone)(!vue-json-excel)(!jspdf)(!jspdf-autotable)(!vee-validate)(!crypto-js)(!crypto)(!es6-promise)(!v-click-outside)[\\/]/,
                    name: "/js/vendor"
                },
            },
        },
    }
})

mix.js('src/app.js', 'js').extract();