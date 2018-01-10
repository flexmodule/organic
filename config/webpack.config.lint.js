//进行代码检查
const webpackMerge=require("webapck-merge");
const webpackBase=require("./webpack.config.base");
const config=require("./config");
module.exports=webpackMerge(webpackBase,{
	module:{
		rules:[
		{
			test:/\.js$/,
			enforce:"pre",
			exclude:/node_modules|lib/,
			loader:"eslint-loader",
			options:{
				fix:true,
				emitWarning:true
			}
		}]
	},
	devServer:{
		inline:true,
		contentBase:config.devServerOutputPath,
		port: '8088',
		historyApiFallback: true,
		overlay:{
			erros:true,
			warnings:true
		}
	}
})