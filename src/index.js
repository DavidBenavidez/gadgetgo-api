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

app.listen(process.env.PORT || 3001, err => {
  if (err) {
    console.log(err);
  } else {
    console.log('\nGadgetGo server is running');
  }
});
