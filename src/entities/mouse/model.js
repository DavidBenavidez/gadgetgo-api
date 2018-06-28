import { Schema } from 'mongoose';

import db from '../../db';

const mouseSchema = new Schema({
  model: { type: String, default: '' },
  category: {type: String, default: ''},
  price: { type: Number, default: 0 },
  rating: { type: Number, default: 0 }
});

const Mouse = db.model('Mouse', mouseSchema);

export default Mouse;