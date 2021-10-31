import mongoose from 'mongoose';

const countrySchema = new mongoose.Schema({
  name: { type: String, required: true },
  topLevelDomain: [{ type: String, required: true }],
  capital: { type: String, required: true },
  subregion: { type: String, required: true },
  region: { type: String, required: true },
  population: { type: String, required: true },
  borders: [{ type: String, required: true }],
  nativeName: { type: String, required: true },
  flag: { type: String, required: true },
  currencies: [{ type: String, required: true }],
  languages: [{ type: String, required: true }],
});

const Country = mongoose.model('Country', countrySchema);

export default Country;
