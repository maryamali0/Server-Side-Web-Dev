
// var createError = require('http-errors');
import createError from 'http-errors';
import express from 'express'
import hbs from 'hbs';
import * as path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import passport from 'passport';
import initializeDataset from './initialdataset.mjs';

hbs.registerHelper('select', function(selected, options) {
  return options.fn(this).replace(
      new RegExp(' value=\"' + selected + '\"'),
      '$& selected="selected"');
});

hbs.registerHelper ("setChecked", function (value, currentValue) {
  if ( value == currentValue ) {
    return "checked";
  } else {
    return "";
  }
});

hbs.registerHelper( "when",function(operand_1, operator, operand_2, options) {
  let operators = {
    'eq': function(l,r) { return l == r; },
    'noteq': function(l,r) { return l != r; },
    'gt': function(l,r) { return Number(l) > Number(r); },
    'or': function(l,r) { return l || r; },
    'and': function(l,r) { return l && r; },
    '%': function(l,r) { return (l % r) === 0; }
  }
      , result = operators[operator](operand_1,operand_2);

  if (result) return options.fn(this);
  else  return options.inverse(this);
});

// Routes
import indexRouter from './routes/index.mjs';
import tastytableRouter from './routes/tastytable.mjs';
import userRouter from './routes/user-server.mjs';
import { initialiseStrategy, initializeJwtStrategy } from './passportconfig.mjs';
import authRouter from './routes/authenticate.mjs';
import apiRouter from './routes/api-router.mjs';

const __dirname = path.resolve();
const app = express();

initialiseStrategy();
initializeJwtStrategy();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
hbs.registerPartials(path.join(__dirname, 'partials'));

app.use(logger('dev'));
app.use(passport.initialize());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
initializeDataset();

app.use('/', indexRouter);
app.use('/', userRouter);
app.use('/', authRouter);
app.use('/tastytable', tastytableRouter);
app.use('/api', apiRouter);  // localhost:3000/api/321

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

export default app;
