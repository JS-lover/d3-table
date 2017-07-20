var ExtractTextPlugin=require('extract-text-webpack-plugin');
var webpack=require('webpack');
var path=require('path');
module.exports={
	entry:{
		main:'./src/js/table.js',//入口文件
	},
	output:{
		path:path.resolve(__dirname,"./dist"),//打包后的文件位置
		filename:'[name].js'
	},
	module:{
		rules:[{
				test:/\.css$/,
				use:['style-loader', 'css-loader']

			  },{
			  	test:/\.js$/,
			  	exclude:/node_modules/,
			    loader: 'babel-loader'
			  },{
				test:  /\.(png|jpg|jpeg|gif|eot|ttf|woff|woff2|svg|svgz)(\?.+)?$/,
				use: [
			          	{
			            	loader: 'url-loader',
			            	options: {limit: 10000}
			          }
			        ]
			  }]
	},
	plugins:[
		new ExtractTextPlugin("*.css")
	]
}