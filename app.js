const express = require('express')
let path = require('path')
const ejs = require('ejs')
const app = express()
const apiRouter = require('./src/routes/api')
const port = 3000

app.use(express.static(path.join(__dirname, '/public')))
app.set('views', path.join(__dirname, '/src/views'));
app.engine('.html', ejs.__express);
app.set('view engine', 'html');
app.use(loggingMiddleware);

const { startServer } = require('./src/utils/myWebsocket');
function loggingMiddleware(req, res, next) {
  const time = new Date();
  console.log(`[${time.toLocaleString()}] ${req.method} ${req.url}`);
  next();
}

app.use('/api', apiRouter);
app.use('*', (req, res) => {
  res.status(404).render('404', { url: req.originalUrl });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).render('500');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});

startServer();