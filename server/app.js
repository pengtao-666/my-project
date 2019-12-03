var createError = require('http-errors')
var express = require('express')
var path = require('path')
var cookieParser = require('cookie-parser')
var logger = require('morgan')

var indexRouter = require('./routes/index')

var app = express()
app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  // Access-Control-Allow-Headers ,可根据浏览器的F12查看,把对应的粘贴在这里就行
  res.header('Access-Control-Allow-Headers', 'Content-Type')
  res.header('Access-Control-Allow-Methods', '*')
  // res.header('Content-Type', 'application/json;charset=utf-8')
  next()
})
// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use('/static', express.static(path.join(__dirname, 'public')))

app.use('/api', indexRouter)
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

// 开发模式 使用supervisor
var debug = require('debug')('my-application') // debug模块
app.set('port', process.env.PORT || 3000) // 设定监听端口
// // 启动监听
var server = app.listen(app.get('port'), function () {
  console.log('Express server listening on port ' + server.address().port)
})
// module.exports = app; 这是 4.x 默认的配置，分离了 app 模块,上线时可以重新改回来
// module.exports = app
