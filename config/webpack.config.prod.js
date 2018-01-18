//主要是生产环境，压缩，合并，抽取js
const webpackBase=require("./webpack.config.base");
const webpackMerge=require("webpack-merge");
const webpack=require("webpack");
module.exports=webpackMerge(webpackBase,{
	plugins:[
		new webpack.optimize.UglifyJsPlugin({
		      compress: {
		        warnings: false
		      },
		      sourceMap: true
		      }),
		new webpack.optimize.CommonsChunkPlugin({
			name:"commons",
			filename:"[name].bundle.js"
		})
	]
});