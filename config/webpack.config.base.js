const webpack=require("webpack");
const path=require("path");
const HTMLWebpackPlugin=require("html-webpack-plugin");
const CleanWebpackPlugin=require("clean-webpack-plugin");
const ExtractTextPlugin=require("extract-text-webpack-plugin");
const config=require("./config");
let HTMLPlugins=[];
let Entry={};
config.entries.forEach((page)=>{
	const htmlplugin=new HTMLWebpackPlugin({
		filename:`${page}/index.html`,
		template: path.resolve(__dirname,`../src/entries/${page}/index.html`),
		inject: true,
		chunks:[page]
	});
	HTMLPlugins.push(htmlplugin);
	Entry[page]=path.resolve(__dirname,`../src/entries/${page}/index.js`);
});
module.exports={
	entry:Entry,
	devtool:"source-map",
	output:{
		filename:"js/[name].bundle.js",
		path:path.resolve(__dirname,"../dist")
	},
	module:{
		rules:[
		{
　　　　　　test: /\.html$/,
　　　　　　loader: 'html-withimg-loader'
　　　　},
		{
			test:/\.css$/,
			exclude:/node_modules/,
			use:ExtractTextPlugin.extract({
				fallback:"style-loader",
				use:[
				{
					loader:"css-loader",
					options:{
						minimize:true
					}
				},
				{
					loader:"postcss-loader"
				}
				]
			})
		},
		{
            test: /\.scss$/,
            exclude:/node_modules/,
            use: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader!sass-loader' })
        },
        {
        	test:/\.js$/,
        	exclude:/node_modules/,
        	use:{
        		loader:"babel-loader",
        		options:{
        			presets:['env']
        		}
        	}
        },
        {
        	test:/\.(png|svg|jpg|gif)$/,
        	use:{
        		loader:"url-loader",
        		options:{
        			limit:1,
        			name:"[name].[ext]",
        			outputPath:config.imgOutputPath,
        			publicPath:'../'
        		}
        	}
        },
        {
        	test:/\.(woff|woff2|eot|ttf|otf)$/,
        	use:{
        		loader:"file-loader"
        	}
        }
		]
	},
	resolve:{
		alias:{
			'@':path.resolve('src')
		}
	},
	plugins:[
		new CleanWebpackPlugin(["dist"]),
		new ExtractTextPlugin({
         filename: './css/[name].css'
        }),
		...HTMLPlugins
	]
}
