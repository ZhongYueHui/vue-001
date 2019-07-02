//由于webpack是由Nodejs构建的，所以任何的Nodejs语法都支持


//引入路径模块
var path = require('path')

//在内存中，根据只当的模板页面，生成一份内存中的首页，同时把打包好的bundle.js注入到页面底部
//如果需要配置插件，需要在导出的对象中挂载一个 plugins:[]
const htmlWebpackPlugin = require('html-webpack-plugin')

//使用render渲染组件必不可少的一部分
const VueLoaderPlugin = require('vue-loader/lib/plugin')

//当以命令形式运行webpack或者webpack-dev-server的时候，工具会发现，我们没用提供要打包的文件入口和出口命令

//此时，就会检查项目根目录中的配置文件 webpack.config.js 并读取这个文件，就拿到了导出的这个配置对象，然后根据对象进行打包


//向外暴露出这个对象
module.exports = {
    entry: path.join(__dirname, './src/main.js') //入口文件，需要打包的文件
        ,
    output: { //出口文件，需要打包到哪里去
        path: path.join(__dirname, './dist') //输出路径
            ,
        filename: 'bundle.js'
    },
    module: {
        rules: [{
            test: /\.css$/i, //配置css
            use: ['style-loader', 'css-loader'],
        }, {
            test: /\.less$/i, //配置less
            use: ['style-loader', 'css-loader', 'less-loader']
        }, {
            test: /\.scss$/i, //配置sass
            use: ['style-loader', 'css-loader', 'sass-loader']
        }, {
            test: /\.(jpg|png|gif|bmp|jpeg)/, //配置图片
            loader: 'url-loader', //在这里时，只有一个我们可以简化 loader，使用use则会报错
            options: {
                limit: 2000, //limit 的值单位是 Byte ，如果图片小于limit的值，则转成base64格式的字符串，如果大于，则不转
                name: '[hash:8]-[name].[ext]' //这是将文件名原样输出[name]指的是图片名，[ext]是图片格式，
                    //[hash:8]表示生成8位hash值，否则在不同文件夹下同名图片会失效，用来区分
            }
        }, {
            test: /\.(ttf|eot|svg|woff|woff2)/,
            loader: 'url-loader'
        }, {
            test: /\.js$/,
            use: 'babel-loader',
            exclude: /node_modules/
        }, {
            test: /\.vue$/,
            use: 'vue-loader'
        }],
    },
    devServer: { //配置webpack-dev-server
        open: true, //是否打开浏览器
        contentBase: 'src', //指定托管的目录
        hot: true, //是否启用热更新
        port: 8000 //代理的端口
    },
    mode: 'development',
    plugins: [
        new htmlWebpackPlugin({
            template: path.join(__dirname, './src/index.html'), //指定模板文件的目录
            filename: 'index.html' //设置生成的页面名称
        }),
        new VueLoaderPlugin()
    ],
    resolve: {
        alias: {

            'vue$': 'vue/dist/vue.esm.js'
        }
    }

}