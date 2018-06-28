import { Schema } from 'mongoose';
// import mongoosePaginate from 'mongoose-paginate';
// import uniqueValidator from 'mongoose-unique-validator';

import db from '../../db';

const phoneSchema = new Schema({
  brand: { type: String, default: '' },
  model: { type: String, default: '' },
  camera: { type: String, default: '' },
  display: { type: Number, default: 0 },
  battery: { type: Number, default: 0 },
  price: { type: Number, default: 0 },
  link: { type: String, default: '' },
  image: { type: String, default: '' }
});

const Phone = db.model('Phone', phoneSchema);

export default Phone;