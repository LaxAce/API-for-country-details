import mongoose from 'mongoose';

const countrySchema = new mongoose.Schema({
  name: { type: String },
  alpha: { type: String },
  topLevelDomain: { type: Array },
  capital: { type: String },
  subregion: { type: String },
  region: { type: String },
  population: { type: Number },
  borders: { type: Array },
  nativeName: { type: String },
  flag: { type: String },
  currencies: { type: Array },
  languages: { type: Array },
});

const Country = mongoose.model('Country', countrySchema);

export default Country;
