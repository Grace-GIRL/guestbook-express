var express = require('express')

var app = express()

app.use('/node_modules/', express.static('./node_modules/'))

// 在 Express 中配置使用 art-template 模板引擎
app.engine('html', require('express-art-template'))

app.get('/', function (req, res) {
  res.render('index.html')
})

app.get('/publish', function (req, res) {
  res.render('publish.html')
})
app.post('/publish',function(req,res){
	res.render('')
})
app.listen(3000, function () {
  console.log('running...')
})
