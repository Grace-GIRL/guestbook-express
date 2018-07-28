# guestbook-express

#### 1.页面跳转

0.创建目录结构，并在views中添加index.html,publish.html静态页面

1.安装bootstrap样式

2.在app.js中，提供两个路由，以渲染index.html,publish.html，同时把node_modules开放出来

3.设置标识，在点击发表留言的时候，跳转至发表留言href="/publish",跳转至首页href="/"

#### 2.首页留言列表渲染

1.创建db.json文件，自己编写相应的json数据，{posts:[ {},{},{} ] }; 将数据手动添加到 app.js中的render首页后边

2.将index.html中，使用模板渲染json数据

3.使用db.json文件中的数据，替换render首页后的数据；引入fs，读取db.json文件，在内部使用try，catch异常捕获，在try内转换json数据格式并渲染数据；

