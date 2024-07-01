## Week3 qq_music_mv界面仿写

### 使用的技术：

原生html+css+js

原生浏览器API fetch获取json数据，实现动态生成标签显示mv数据



### 实现的页面效果图：

![img](README_IMG/result.png)



### 开发思路：

先完成大体的静态页面，再实现动态功能



### 静态页面整体布局

整个html分为两大部分

header导航栏和main展示mv具体部分

1.header导航栏分为两部分top和bottom

①top部分包括qq音乐logo、nav、search搜索栏、最右侧部分

②bottom部分为首页、歌手、新碟这种选择

2.main部分分为tags和details两部分



### 动态功能实现

动态功能主要由js实现：

使用js中的ajax技术来拉取远程资源，通常是发送http请求获取，这里是使用给的js文件中的数据来模拟

具体实现方式：使用原生api fetch方法进行获取远程资源

对ajax技术有了进一步的了解

对fetch的使用（fetch获取远程资源、对获取的远程资源进行合理的处理）和异步函数/异步操作有了进一步的理解，在具体里的代码中使用了await的语法糖（结合使用async/try-catch）



使用js监听用户点击浏览器特定标签触发对应事件：

主要逻辑：

添加用户点击触发处理事件函数，更改样式、更改变脸、更改显示数据



有一部分动态功能由css动画实现：

可以通过css的transition实现

transition重点属性：

transition-duration: 0.5s;

transition-timing-function: ease;

transition-delay: 0s;

 transition-property: opacity;



也可以通过css的transform实现



### 遇到的难点：

由于由于main部分的tag是由js动态生成，直接使用querySelector无法获取，需要在DOMContentLoaded状态下即页面加载完成后再获取



### 感悟与收获：

大体掌握前端页面开发思路和开发结构，对前端开发有了一个大体的认知

掌握js实现动态功能，大体掌握ajax技术思想，具体掌握fetch这一api使用与异步函数/异步操作

教长时间用来写css来尽可能模仿接近官网，感觉需要继续练习来熟练掌握

了解到浏览器的localStorage和SessionStorage，稍微使用了一下





### 优化/改进

filterRule.js其实不需要通过fetch来获取数据，直接使用模块化开发即可

通过export/import即可



不需要通过DOMContentLoaded状态下添加事件，直接在创建元素后添加点击事件（逻辑链：更改样式、）即可，这样子逻辑清晰，而且保留了使用的变量，方便后续维护



...其他待优化
