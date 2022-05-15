const path = require('path'); // подключаем path для определения относительных путей
const HtmlWebpackPlugin = require('html-webpack-plugin'); //плагин HTML для webpack
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); // подключили плагин для автоматического удаления старых файлов
const MiniCssExtractPlugin = require('mini-css-extract-plugin');


module.exports = {
  entry: { main: './src/index.js' }, //точка входа
  output: { //Выходной файл
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js',
    publicPath: ''
  },
  mode: "development",
  devServer: { //насройки dev Сервера
    static: path.resolve(__dirname, './dist/'),
    compress: true,
    port: 8080,
    open: true
  },
  module: {
    rules: [{
        //объект правил для бабеля
        // регулярное выражение, которое ищет все js файлы
        test: /\.js$/,
        // при обработке этих файлов нужно использовать babel-loader
        use: 'babel-loader',
        // исключает папку node_modules, файлы в ней обрабатывать не нужно
        exclude: '/node_modules/'
      },
      {
        test: /\.(png|svg|jpg|gif|woff(2)?|eot|ttf|otf)$/,
        type: 'asset/resource'
      },
      {
        // применять это правило только к CSS-файлам
        test: /\.css$/,
        // при обработке этих файлов нужно использовать
        // MiniCssExtractPlugin.loader и css-loader
        use: [MiniCssExtractPlugin.loader, {
            loader: 'css-loader',
            options: { importLoaders: 1 }
          },
          'postcss-loader'
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html' // путь к файлу index.html
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin()
  ]
}