import mongoose from 'mongoose';

mongoose.Promise = global.Promise;

const db = mongoose.createConnection('mongodb://localhost/techBro');

db.on('error', err => console.log(err));

db.once('open', () => console.log('Successfully connected to MongoDB'));

export default db;