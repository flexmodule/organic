//主要用来开发环境使用
const webpackBase=require("./webpack.config.base");
const webpackMerge=require("webpack-merge");
const config=require("./config");
module.exports=webpackMerge(webpackBase,{
	devServer:{
		inline:true,
		hot:true,
		contentBase:config.devServerOutputPath,
		port: '8088',
		historyApiFallback: true,
		overlay:{
			errors:true,
			warnings:true
		}
	}
})