# organic
有机农产品销售
1.安装webpack，编译打包
2.安装webpack-dev-server配置服务器
3.配置一个模板路径（templatePath），插件就可以自动找到该目录下所有的html模板，准备解析
4.可以配置解析模板的加载器（loader），用于解析模板文件，可以配置解析模板的加载器（loader），用于解析模板文件，非必传，在module.loaders中配置同样有效
5.可以配置模板的后缀（templateSuffix），用于过滤模板路径下的非模板文件
6.以配置需要过滤的文件（ignore），有些公用的模板，例如header和footer，只是用来引用的，不需要输出成单独的html文件，这个也是需要过滤掉的
7.可以配置html文件的输出路径(path)
8.还要提供一套规则来引用生成的css和js，使用##entry.[name].css/js##的方式来引用，name为entry配置项中的key值，js用于js文件，css用于css文件，匹配失败则不做替换

-------------------------------------------------
https://www.jianshu.com/p/f6a2a47d084d?hmsr=toutiao.io
---------------
https://segmentfault.com/a/1190000005920125