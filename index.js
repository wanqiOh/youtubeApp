import videos from './routes/video.js';
import express from 'express';
import bp from 'body-parser';
// server.js
var app = express();
var port = 8080;

// start the server
// app.use(express.json());
// app.use(express.urlencoded({extended: true}));
app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, Content-Type, X-Auth-Token');
  next();
});

app.use('/ids', videos);

app.listen(port, function() {
  console.log(`Server running on port: http://localhost:${port}`);
});

// route our app
app.get('/', function(req, res) {
  res.send('hello world!');
});