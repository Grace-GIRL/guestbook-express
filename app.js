var express = require('express')

var fs=require('fs')

var app = express()

app.use('/node_modules/', express.static('./node_modules/'))

// 在 Express 中配置使用 art-template 模板引擎
app.engine('html', require('express-art-template'))

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
    fs.readFile('./db.json',function(err,data){
    	if(err){
    		return res.render('500.html',{
    			errMessage:err.message
    		})
    	}
    	try{
    		data=JSON.parse(data.toString())
    		res.render('index.html',{
    			posts:data.posts
    		})
    	}catch(err){
    		return res.render('500.html',{
    			errMessage:err.message
    		})
    	}
    })
    
})

app.get('/publish', function(req, res) {
    res.render('publish.html')
})
app.post('/publish', function(req, res) {
    res.render('')
})
app.listen(3000, function() {
    console.log('running...')
})
