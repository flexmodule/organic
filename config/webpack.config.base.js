const webpack=require("webpack");
const path=require("path");
const HTMLWebpackPlugin=require("html-webpack-plugin");
const CleanWebpackPlugin=require("clean-webpack-plugin");
const ExtractTextPlugin=require("extract-text-webpack-plugin");
const config=require("./config");
const HappyPack=require("happypack");//happypack让loader多线程处理编译
const os=require("os");
let HappyThreadPool=HappyPack.ThreadPool({size:os.cpus().length});
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
　　　　　　loader: 'HappyPack/loader?id=html-withimg'
　　　　},
		{
			test:/\.css$/,
			exclude:/node_modules/,
			use:ExtractTextPlugin.extract({
				fallback:"HappyPack/loader?id=style",
				use:[
				{
					loader:"HappyPack/loader?id=css",
					options:{
						minimize:true
					}
				},
				{
					loader:"HappyPack/loader?id=postcss"
				}
				]
			})
		},
		{
            test: /\.scss$/,
            exclude:/node_modules/,
            use: ExtractTextPlugin.extract({ fallback: 'HappyPack/loader?id=style', use: 'HappyPack/loader?id=css!HappyPack/loader?id=sass' })
        },
        {
        	test:/\.js$/,
        	exclude:/node_modules/,
        	use:{
        		loader:"HappyPack/loader?id=babel",
        		options:{
        			presets:['env']
        		}
        	}
        },
        {
        	test:/\.(png|svg|jpg|gif)$/,
        	use:{
        		loader:"HappyPack/loader?id=url",
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
        		loader:"HappyPack/loader?id=file"
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
		...HTMLPlugins,
		new HappyPack({
	    id: 'html-withimg',
	    loaders: [{
	    loader: 'html-withimg-loader',
	    options: { babelrc: true, cacheDirectory: true ,threadPool:HappyThreadPool}
        }]
        }),
        new HappyPack({
	    id: 'style',
	    loaders: [{
	    loader: 'style-loader',
	    options: { babelrc: true, cacheDirectory: true ,threadPool:HappyThreadPool}
        }]
        }),
        new HappyPack({
	    id: 'css',
	    loaders: [{
	    loader: 'css-loader',
	    options: { babelrc: true, cacheDirectory: true ,threadPool:HappyThreadPool}
        }]
        }),
        new HappyPack({
	    id: 'postcss',
	    loaders: [{
	    loader: 'postcss-loader',
	    options: { babelrc: true, cacheDirectory: true ,threadPool:HappyThreadPool}
        }]
        }),
        new HappyPack({
	    id: 'sass',
	    loaders: [{
	    loader: 'sass-loader',
	    options: { babelrc: true, cacheDirectory: true ,threadPool:HappyThreadPool}
        }]
        }),
        new HappyPack({
	    id: 'babel',
	    loaders: [{
	    loader: 'babel-loader',
	    options: { 
	    	babelrc: true, 
	    	cacheDirectory: true ,
	    	threadPool:HappyThreadPool}
        }]
        }),
		new HappyPack({
	    id: 'url',
	    loaders: [{
	    loader: 'url-loader',
	    options: { babelrc: true, cacheDirectory: true ,threadPool:HappyThreadPool}
        }]
        }),
		new HappyPack({
	    id: 'file',
	    loaders: [{
	    loader: 'file-loader',
	    options: { babelrc: true, cacheDirectory: true ,threadPool:HappyThreadPool}
        }]
        })
	]
}
