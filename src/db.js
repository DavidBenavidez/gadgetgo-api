import mongoose from 'mongoose';

mongoose.Promise = global.Promise;

// const db = mongoose.createConnection('mongodb://localhost/gadgetgo');
const db = mongoose.createConnection(
  'mongodb://admin:password1.mlab.com:18168/gadgetgo',
);
db.on('error', err => console.log(err));

db.once('open', () => console.log('Successfully connected to MongoDB'));

export default db;
