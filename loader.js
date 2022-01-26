const app = require('./server');
//const router = require('./routes/main.route');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const expressSanitizer = require('express-sanitizer');
const bodyParser = require('body-parser');

app.use(bodyParser.json(), bodyParser.urlencoded({ extended: true }));
app.use(expressSanitizer());
app.use(cookieParser());
app.set('trust proxy', 1);
app.use(session({
  secret: 'isitronics',
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: true,
    maxAge: 60000,
    httpOnly: false,
  }
}));

app.use('/', router);
module.exports = app;