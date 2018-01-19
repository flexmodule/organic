//主要是生产环境，压缩，合并，抽取js
const webpackBase=require("./webpack.config.base");
const webpackMerge=require("webpack-merge");
const webpack=require("webpack");
module.exports=webpackMerge(webpackBase,{
	plugins:[
		new webpack.optimize.UglifyJsPlugin({
			  output:{
			  	comments:false// 压缩时去掉js所有注释，包括copyright信息
			  },
		      compress: {
		        warnings: false
		      },
		      sourceMap: true
		      }),
			  externals:{
			  	//排除资源打包
			  }
		new webpack.optimize.CommonsChunkPlugin({
			name:"commons",
			filename:"[name].bundle.js"
		})
	]
});