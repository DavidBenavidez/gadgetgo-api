import express from 'express';
import bodyParser from 'body-parser';
import router from './router';

const app = express();

// body parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Setup Routes
app.use('/api', router);
app.use('*', (req, res) => res.redirect('/'));

app.listen(3001, err => {
  if (err) {
    console.log(err);
  } else {
    console.log('\nGadgetGo server is running');
  }
});

// // for CORS
// app.use(function(req, res, next) {
//   res.setHeader('Access-Control-Allow-Origin', '*');
//   res.setHeader('Access-Control-Allow-Credentials', 'true');
//   res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
//   res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');

//   res.setHeader('Cache-Control', 'no-cache');
//   next();
// });
