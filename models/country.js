import mongoose from 'mongoose';

const countrySchema = new mongoose.Schema({
  name: { type: String },
  alpha: { type: String },
  topLevelDomain: [{ type: String }],
  capital: { type: String },
  subregion: { type: String },
  region: { type: String },
  population: { type: Number },
  borders: [{ type: String }],
  nativeName: { type: String },
  flag: { type: String },
  currencies: [{ type: String }],
  languages: [{ type: String }],
});

const Country = mongoose.model('Country', countrySchema);

export default Country;
