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

#### 3.表单提交到首页

1.在publish.html中，设置action为“/publish”,method="post";表单提交使用post方式，需要引入第三方包body-parser解析表单post请求体，通过req.body获取表单数据；（如果是get，使用node内置的req.query)

2.将获取的数据添加到首页列表中，注意id值得设置和使用moment时间库，并持久化存储到db.json中。

3.封装操作 ：封装带有异常的异步操作，封装getPosts方法；

#### 4.操作mysql数据库









question: 

hs -c-1 -o  利用回调函数封装ajax异步请求方法

封装带有错误对象的异常捕获异步操作； 基本原理回调函数，原则调用者可以获得错误信息且由调用者决定怎么处理，方法是错误往外抛一般设为第一个参数；

