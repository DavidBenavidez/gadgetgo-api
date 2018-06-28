import { Schema } from 'mongoose';

import db from '../../db';

const laptopSchema = new Schema({
  brand: { type: String, default: '' },
  model: { type: String, default: '' },
  cpu: { type: String, default: '' },
  gpu: {type: String, default: ''},
  category: {type: String, default: ''},
  price: { type: Number, default: 0 },
  rating: { type: Number, default: 0 }
});

const Laptop = db.model('Laptop', laptopSchema);

export default Laptop;