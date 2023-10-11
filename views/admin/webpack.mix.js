const mix = require('laravel-mix');
/*require('laravel-mix-bundle-analyzer');

if (mix.isWatching()) {
    mix.bundleAnalyzer();
}*/

let webpack = require('webpack');
//const resourceRoot = '/static/admin'
//const publicPath = '/static/admin/'

const resourceRoot = '/public/static/admin'
const publicPath = '/public/static/admin/'

// setResroucesRoots add prefix to url() in scss on example: from /images/close.svg to /static/images/close.svg
mix.setResourceRoot(resourceRoot)

// Path where mix-manifest.json is created
mix.setPublicPath('../../public/static/admin')

mix.webpackConfig({
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            '@': __dirname + '/src/',
            //'@sass': __dirname + '/static/sass/'
        },
    },
    output: {
        publicPath: publicPath,
        // publicPath: 'https://cdn-web-data.s3.eu-west-2.amazonaws.com/static/front/',
        // filename: '[name].js',
       // chunkFilename: '[name].js',
    },
    optimization: {
        runtimeChunk: 'single',
          splitChunks: {
            chunks: 'all',
            maxInitialRequests: Infinity,
            minSize: 0,
            cacheGroups: {
                vueVendor: {
                    test: /[\\/]node_modules[\\/](vue|axios|vue-axios|vue-cookies|vue-localstorage|vue-router|vue2-datepicker|vue2-filters|vuejs-paginate|vuex|bootstrap-vue|es6-promise|v-click-outside)[\\/]/,
                    name: "/js/vuevendor"
                },
                utilityVendor: {
                    test: /[\\/]node_modules[\\/](jquery|lodash|moment|vue-json-excel|jspdf|jspdf-autotable|vee-validate|crypto-js|crypto)[\\/]/,
                    name: "/js/utilityVendor"
                },
                vendor: {
                    test: /[\\/]node_modules[\\/](!vue)(!axios)(!vue-axios)(!vue-cookies)(!vue-localstorage)(!vue-router)(!vue2-datepicker)(!vue2-filters)(!vuejs-paginate)(!vuex)(!bootstrap-vue)(!jquery)(!lodash)(!moment)(!vue-json-excel)(!jspdf)(!jspdf-autotable)(!vee-validate)(!crypto-js)(!crypto)(!es6-promise)(!v-click-outside)[\\/]/,
                    name: "/js/vendor"
                },
            },
        },
    }
})

mix.js('src/app.js', 'js').extract();

// mix.js('src/app.js', 'static/assets/js')
// .sass("static/assets/sass/app.scss", "static/assets/css").extract();
/*
mix.js('src/app.js', 'js')
.sass("static/assets/sass/app.scss", "css").extract();*/