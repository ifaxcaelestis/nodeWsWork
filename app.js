const express = require('express')
let path = require('path')
const ejs = require('ejs')
const { createServer } = require("http");
const { Server } = require("socket.io");
const apiRouter = require('./src/routes/api')



const app = express()
const port = 3000
const wsPort = 8080

const httpServer = createServer(app);

const io = new Server(httpServer, { cors: true });
// 写socket的代码
io.on('connection', function (socket) {
  console.log('建立链接')

  // 群聊的实现
  socket.on('message1',function(data){
      console.log(data);

      // 群聊的实现 1对多，广播
      io.emit('servermessage',data);   // 服务器给客户端发送数据
  });
  
  // 智能客服的实现
  socket.on('message2',function(data){
      console.log(data);

      // 智能客服的实现 1对1，客户端之间互不影响
      var msg = '';
      if(data == 302) {
          msg = '您当前的话费有100元'
      }else if(data == 301){
          msg = '您当前的流量有2000M'
      } else {
          msg = '请输入正确的信息'
      }
      socket.emit('servermessage', msg);
  });
});

app.use(express.static(path.join(__dirname, '/public')))
app.set('views', path.join(__dirname, '/src/views'));
app.engine('.html', ejs.__express);
app.set('view engine', 'html');
app.use(loggingMiddleware);
httpServer.listen(port);

function loggingMiddleware(req, res, next) {
  const time = new Date();
  console.log(`[${time.toLocaleString()}] ${req.method} ${req.url}`);
  next();
}

app.use('/api', apiRouter);
app.use('/', (req, res) => {
    res.json({ name: 'testJson', website: 'https://github.com/ifaxcaelestis/nodeWsWork' });
});
app.use('*', (req, res) => {
  res.status(404).render('404', { url: req.originalUrl });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).render('500');
});

// app.listen(port, () => {
  // console.log(`Example app listening on port ${port}`)
// });


// const { startServer } = require('./src/utils/myWebsocket');

// startServer();