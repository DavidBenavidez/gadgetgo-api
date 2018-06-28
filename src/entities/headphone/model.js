import { Schema } from 'mongoose';

import db from '../../db';

const headphoneSchema = new Schema({
  model: { type: String, default: '' },
  category: {type: String, default: ''},
  price: { type: Number, default: 0 },
  rating: { type: Number, default: 0 }
});

const Headphone = db.model('Headphone', headphoneSchema);

export default Headphone;