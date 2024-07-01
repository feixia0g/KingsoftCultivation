# juejin_course_copy_backup

### 关于webpack打包以实现前端工程化：

#### 使用如下指令初始化webpack自动化配置：（注：需要输入两次）

```
npx webpack init
```

#### 本次webpack自动化配置参考如下：

![image-20240501022332070](/README_IMG/webpackInit.png)

#### 初始化eslint和prettier：

```
npm i eslint -D 

./node_modules/.bin/eslint --init (没有eslint就全局安装) 

npm i eslint-config-prettier eslint-plugin-prettier -D
```

eslint检查语法错误以及纠正ts更优雅的写法，prettier用于格式化文档

注：该项目中保留了自动生成的eslint.config.mjs



#### 关于本次webpack使用的插件：html-webpack-plugin

webpack.config.js中配置如下：

![img](/README_IMG/plugin.png)



#### webpack热部署--自动更新：

使用webpack-dev-server并配置：

package.json文件中scripts配置如下：

![img](/README_IMG/hotDeployment.png)



### 添加eslint配置文件.eslintrc.json以及prettier配置文件.prettierrc检查代码风格与潜在错误

#### 配置eslint：

将eslint版本回退至8.56：

```
npm install eslint@8.56
```

初始化eslint：

```
npx eslint --init
```

根据提示选择初始化配置，并删掉eslint.config.mjs

添加.eslintrc.json或.eslintrc.js或.eslintrc

这里我选择了.eslintrc.json，配置信息如下：
![image-20240501022332070](/README_IMG/eslintrc_json.png)

该项目使用standard-with-typescript规则，需要安装eslint-config-standard-with-typescript插件：

```
npm install eslint-config-standard-with-typescript
```

这里可能会报错显示依赖冲突：

![image-20240501022332070](/README_IMG/install_conflict_error.png)

需要卸载typescript-eslint:

```
npm remove typescript-eslint
```

再进行安装eslint-config-standard-with-typescript即可

#### 配置prettier：

添加.prettier配置文件，配置信息如下：

![image-20240501022332070](/README_IMG/prettierrc.png)

同时在setting.json中添加prettier配置：

![image-20240501022332070](/README_IMG/setting_json.png)

#### 注意：配置完后需要在vscode插件安装eslint和prettier插件

#### 如何更改eslint使用的规则：

首先要卸载掉之前的eslint使用的规则所需要的规则依赖

比如我要更换成airbnb-base规则，那么我需要先卸载eslint-config-standard-with-typescript：

```
npm remove eslint-config-standard-with-typescript
```

再安装airbnb-base：

```
npm install eslint-config-airbnb-base eslint-plugin-import --save-dev
```

#### 关于启用rules中的"prettier/prettier": "error"规则后出现满屏报错：

vscode报错全屏的 Delete\`CR\`eslint(prettier/prettier)问题：

![image-20240501022332070](/README_IMG/every_line_error.png)

重新设置git即可：

```
git config --global core.autocrlf false
```

原因是git的一个配置属性：
由于历史原因，windows下和linux下的文本文件的换行符不一致。

* Windows在换行的时候，同时使用了回车符CR(carriage-return character)和换行符LF(linefeed character) 

* 而Mac和Linux系统，仅仅使用了换行符LF 

* 老版本的Mac系统使用的是回车符CR 




### 配置好whistle并安装chrome插件SwitchOmega以及写好代理规则进行抓包：

#### whistle代理规则如下（解决跨域问题）：

![image-20240501022332070](/README_IMG/ProxyRules.png)

#### 抓包示意图如下：

![image-20240501022332070](/README_IMG/packageCapture.png)

#### SwitchOmega配置如下：

![image-20240501022332070](/README_IMG/SwitchOmega.png)



### 掘金小册课程网页仿写示意图：

注意：通过代理fetch到的远程资源只是示例数据，并非真实数据

![image-20240501022332070](/README_IMG/result1.png)

![image-20240501022332070](/README_IMG/result2.png)

![image-20240501022332070](/README_IMG/result3.png)

![image-20240501022332070](/README_IMG/result4.png)



### 后续维护与补充：

#### 数据加载动画实现：

效果图：

![image-20240507000707191](/README_IMG/loadDataAnimation1.png)

![image-20240507000707191](/README_IMG/loadDataAnimation2.png)

![image-20240507000707191](/README_IMG/loadDataAnimation3.png)

![image-20240507000707191](/README_IMG/loadDataAnimation4.png)

同时修复了点击全部标签会重复触发9次对应事件的bug以及点击只看VIP课程标签会重复出发3次对应事件的bug

#### 修改一部分细节使得与原网页效果一致：

创作等级为0不显示图片

![img](/README_IMG/user_level.png)

调整新品/VIP标签与标题的间隔

![img](/README_IMG/gap_distance.png)

将价格为0的掘金小册由数字0改为文字免费，并调整样式

![img](/README_IMG/free_text.png)

当分类未查询到任意对应掘金小册，显示该分类下暂无小册图片与描述

![img](/README_IMG/empty_content.png)

修复了点击掘金小册下的分类标签动画和原来的旧数据一起显示（应该是清除旧数据显示加载动画再显示筛选的新数据的顺序）的bug