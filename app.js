var express = require('express')

var fs = require('fs')

var bodyParser = require('body-parser')

var moment = require('moment')


var posts = require('./posts') 

var app = express()

app.use('/node_modules/', express.static('./node_modules/'))


// 在 Express 中配置使用 art-template 模板引擎
app.engine('html', require('express-art-template'))
 //配置表单post请求body-parser
app.use(bodyParser.urlencoded({ extended: false }))

app.get('/', function(req, res) {
    // res.render('index.html', {
    //     "posts": [

    //         {
    //             "id": 1,
    //             "name": "张三",
    //             "content": "hehehehe",
    //             "time": "2018-01-17 12:01:01",
    //         }, {
    //             "id": 2,
    //             "name": "张三2",
    //             "content": "hehehehe",
    //             "time": "2018-01-17 12:01:01",
    //         }, {
    //             "id": 3,
    //             "name": "张三3",
    //             "content": "hehehehe",
    //             "time": "2018-01-17 12:01:01",
    //         }, {
    //             "id": 4,
    //             "name": "张三4",
    //             "content": "hehehehe",
    //             "time": "2018-01-17 12:01:01",
    //         }

    //     ]
    // })
    // 
    // 
    // 
    // fs.readFile('./db.json', function(err, data) {
    //     if (err) {
    //         return res.render('500.html', {
    //             errMessage: err.message
    //         })
    //     }
    //     try {
    //         data = JSON.parse(data.toString())
    //         res.render('index.html', {
    //             posts: data.posts
    //         })
    //     } catch (err) {
    //         return res.render('500.html', {
    //             errMessage: err.message
    //         })
    //     }
    // })
    // 
    posts.getPosts(function(err,data){
    	if(err){
    		return res.render('500.html',{
    			errMessage:err.message
    		})
    	}
    	res.render('index.html',{
    		posts:data
    	})
    })

})

app.get('/publish', function(req, res) {
    res.render('publish.html')
})
app.post('/publish', function (req, res) {
  console.log('收到表单 post 提价了 ')
  // 在 Express 中没有提供解析表单 POST 请求体的能力
  // 但是 Express 非常的开放，有一个第三方包插件：body-parser
  // Express 像 jQuery 一样，有很好插件
  // 其中 body-parser 就是插件的一种
  // 它的作用就是帮你解析表单 POST 请求体
  // 极简、灵活
  // Express 本身更像是一个平台，只处理基本功能
  // 它也在自身平台开放了很多接口，开发者可以根据自己的需求灵活定义自己需要的功能
  // 1. 获取表单数据
  //    req.body
  // 2. 表单数据校验
  //    数据校验
  //    永远不要相信用户的输入
  //    数据格式校验
  //      是否非空
  //      是否符合格式
  //    业务数据校验
  //      用户名是否被占用
  // 3. 持久化存储数据到数据库
  //    把文件中的内容读取出来转成对象
  //    把表单提交上来的数据 push 到对象中
  //    最后把结果对象再次转成字符串存储到文件中
  //    从而实现对文件中数据的修改
  // 4. 发送响应
  var body = req.body

  // fs.readFile('./db.json', function (err, data) {
  //   if (err) {
  //     return res.render('500.html', {
  //       errMessage: err.message
  //     })
  //   }
  //   try {
  //     data = JSON.parse(data.toString())
  //     var posts = data.posts
  //     var last = posts[posts.length - 1]
  //     posts.unshift({
  //       id: last ? last.id + 1: 1,
  //       name: body.name,
  //       content: body.content,
  //       time: moment().format('YYYY-MM-DD HH:mm:ss') // moment 是一个专门用来处理时间的 JavaScript 库
  //     })

  //     // 把对象转成字符串存储到文件中
  //     // try-catch 无法捕获异步代码的异常
  //     fs.writeFile('./db.json', JSON.stringify(data), function (err) {
  //       if (err) {
  //         return res.render('500.html', {
  //           errMessage: err.message
  //         })
  //       }
  //       // 代码执行到这里，说明写入文件成功了
  //       // 在 Express 中，我们可以使用 res.redirect() 实现服务端重定向的功能
  //       res.redirect('/')
  //     })
  //   } catch (err) {
  //     return res.render('500.html', {
  //       errMessage: err.message
  //     })
  //   }
  // })
  
  // body.time=moment().format('YYYY-MM-DD HH:mm:ss')


  //   **********************
  // #region /第一次的封装
  // **********************
  posts.getPosts(function (err, posts) {
    if (err) {
      return res.render('500.html', {
        errMessage: err.message
      })
    }
    // posts 中 push 一个对象
    // 持久化存储 posts 中的数据
    var last = posts[posts.length - 1]
    posts.unshift({
      id: last ? last.id + 1: 1,
      name: body.name,
      content: body.content,
      time: moment().format('YYYY-MM-DD HH:mm:ss') // moment 是一个专门用来处理时间的 JavaScript 库
    })
    fs.writeFile('./db.json', JSON.stringify({posts: posts}), function (err) {
      if (err) {
        return res.render('500.html', {
          errMessage: err.message
        })
      }
      // 代码执行到这里，说明写入文件成功了
      // 在 Express 中，我们可以使用 res.redirect() 实现服务端重定向的功能
      res.redirect('/')
    })
  })
  // **********************
  // #endregion /第一次的封装
  // **********************

  // posts.addPost(body,function(err){
  // 	if(err){
  // 		return res.render('500.html',{
  // 			errMessage:err.message
  // 		})
  // 	}
  // 	res.redirect('/')
  // })

})

app.listen(3000, function() {
    console.log('running...')
})
