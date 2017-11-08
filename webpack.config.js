var path = require('path');
var htmlwp = require('html-webpack-plugin');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
//此配置文件在控制台上使用webpack的时候后面如果不添加任何参数，则默认会查找webpack.config.js的配置文件去执行
module.exports = {
    //配置打包入口文件
    entry: {
        // build 这个名字可以随便起，最后生成的.js是按照这个名字来命名的
        build: './src/main.js', //表示打包的时候自动查找当前目录下面的src下面的main.js作为入口文件
        // 分离公共组件配置步骤1：配置当前项目中的各个公共组件为单独的供应商(vendor)
        vendor1: ['vue', 'vuex', 'axios', 'vue-router'],
        vendor2: ['element-ui'],
        vendor3: ['vue-quill-editor']
    },
    //配置打包时的生成文件
    output: {
        path: path.join(__dirname, '/dist'),
        filename: '[name].js'
    },
    module: {
        loaders: [{
                //打包的时候碰到.css文件则被这个正则匹配
                test: /\.css$/,
                //交给'style-loader','css-loader'去进行打包
                //编写的顺序一定是：先'style-loader'然后再是'css-loader'
                //webpack的顺序，先使用css-loader再使用style-loader
                // loader: ['style-loader', 'css-loader']
                loader: ExtractTextPlugin.extract({ fallback: "style-loader", use: "css-loader" })
            },
            {
                test: /\.less$/,
                // loader: ['style-loader', 'css-loader', 'less-loader']
                loader: ExtractTextPlugin.extract({ fallback: "style-loader", use: "css-loader!less-loader" })

            },
            {
                test: /\.scss$/,
                // loader: ['style-loader', 'css-loader', 'sass-loader']
                loader: ExtractTextPlugin.extract({ fallback: "style-loader", use: "css-loader!sass-loader" })

            },
            {
                test: /\.(png|jpg|gif|ttf|woff)$/,
                loader: ['url-loader?limit=10240']
            },
            //配置.vue文件的打包正则
            {
                test: /\.vue$/,
                loader: ['vue-loader']
            },
            //配置ES6转ES5语法
            {
                test: /\.js$/,
                loader: ['babel-loader'],
                exclude: /node_modules/
            }
        ]
    },
    plugins: [
        new htmlwp({
            filename: 'index.html',
            template: 'index1.html'
        }),
        new webpack.optimize.CommonsChunkPlugin({
            // 这里和上面第一步的配置相反即可
            names: ['vendor3', 'vendor2', 'vendor1']
        }),
        new ExtractTextPlugin("[name].css")
    ]
}