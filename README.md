# organic
安装运行:<br>
npm install
---------------------
npm start
-------------------------------
webpack封装的多页面脚手架
--------------------------------------
1.安装webpack，编译打包<br>
2.安装webpack-dev-server配置服务器,webpack-dev-server是一个小型的Node.js Express服务器,它使用webpack-dev-middleware来服务于webpack的包,除此自外，它还有一个通过Sock.js来连接到服务器的微型运行时.webpack-dev-server主要是启动了一个使用express的Http服务器。它的作用主要是用来伺服资源文件。此外这个Http服务器和client使用了websocket通讯协议，原始文件作出改动后，webpack-dev-server会实时的编译，但是最后的编译的文件并没有输出到目标文件夹<br>
3.安装 webpack-merge,该插件用来对 webpack 配置进行合并操作。<br>
4.安装 babel 相关插件,这系列插件用来对 ES6 语法进行转换npm install babel-core babel-loader babel-preset-env --save-dev<br>
5.安装样式处理相关插件npm install css-loader style-loader postcss-loader autoprefixer --save-dev这系列插件用来处理 CSS 样式，其中 autoprefixer 是 postcss 的一个插件，用来自动给 CSS 样式添加前缀。<br>
6.安装html-webpack-plugin，能自动生成 HTML 文件，并自动引用打包后的 JavaScript 文件。所谓自动生成 HTML 文件，可以理解为将源代码的 HTML 复制到目标文件夹中，同时自动引用打包后的 JavaScript 文件。<br>
7.安装clean-webpack-plugin自动清理dist文件夹<br>
8.安装extract-text-webpack-plugin抽取css<br>
3.配置一个模板路径（templatePath），插件就可以自动找到该目录下所有的html模板，准备解析<br>
4.可以配置解析模板的加载器（loader），用于解析模板文件，可以配置解析模板的加载器（loader），用于解析模板文件，非必传，在module.loaders中配置同样有效<br>
5.可以配置模板的后缀（templateSuffix），用于过滤模板路径下的非模板文件<br>
6.以配置需要过滤的文件（ignore），有些公用的模板，例如header和footer，只是用来引用的，不需要输出成单独的html文件，这个也是需要过滤掉的
7.可以配置html文件的输出路径(path)<br>
8.还要提供一套规则来引用生成的css和js，使用##entry.[name].css/js##的方式来引用，name为entry配置项中的key值，js用于js文件，css用于css文件，匹配失败则不做替换<br>

-------------------------------------------------

config文件解析<br>
1.webpack.config.js   根据环境变量引用相关的配置文件<br>
2.webpack.config.base.js   基础配置文件<br>
a.相关插件引入<br>
b.自定生成HTML配置<br>

优化处理<br>
------------------------------------
1.处理编译速度，使loader多进程编译<br>
happypack<br>



遇到的坑
------------------
1.webpack对于html处理不友好，需要html-withimg-loader插件才能在html中读取img src的图片<br>
2.happypack在处理babel-loader时，出错
