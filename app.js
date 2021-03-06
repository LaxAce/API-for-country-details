import express from 'express';
import fetch from 'node-fetch';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Country from './models/country.js';
import cors from 'cors';

dotenv.config();
const app = express();

app.use(cors());

// Uploading data to the Database

// app.use(express.json());

// app.get('/add', (req, res) => {
//   fetch('https://restcountries.com/v2/all')
//     .then(response => response.json())
//     .then(datas => {
//       datas.map(data => {
//         const country = new Country({
//           name: data.name,
//           alpha: data.alpha3Code,
//           topLevelDomain: data.topLevelDomain,
//           capital: data.capital,
//           subregion: data.subregion,
//           region: data.region,
//           population: data.population,
//           borders: data.borders,
//           nativeName: data.nativeName,
//           flag: data.flag,
//           currencies:
//             data.currencies && data.currencies.map(currency => currency.name),
//           languages: data.languages && data.languages.map(lang => lang.name),
//         });

//         country
//           .save()
//           .then(result => res.send(result))
//           .catch(err => console.log(err));
//       });
//     })

//     .catch(err => console.log(err));
// });

// All Countries
app.get('/countries', async (req, res) => {
  try {
    const countries = await Country.find();
    countries.length == 0
      ? res.json({ status: 404, message: 'Country Not Found' })
      : res.json(countries);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Searching by name
app.get(`/name/:name`, async (req, res) => {
  const name = req.params.name;
  const newName = new RegExp(
    name[0].toUpperCase() + name.slice(1).toLocaleLowerCase(),
    'i'
  );

  try {
    const country = await Country.find({ name: newName });
    country.length == 0
      ? res.json({ status: 404, message: 'Country Not Found' })
      : res.json(country);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Searching by region
app.get(`/region/:region`, async (req, res) => {
  const region = req.params.region;
  const newRegion =
    region[0].toUpperCase() + region.slice(1).toLocaleLowerCase();

  try {
    const country = await Country.find({ region: newRegion });
    country.length == 0
      ? res.json({ status: 404, message: 'Region Not Found' })
      : res.json(country);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Searching by id
app.get(`/id/:id`, async (req, res) => {
  try {
    const country = await Country.findById(req.params.id);
    country.length == 0
      ? res.json({ status: 404, message: 'Region Not Found' })
      : res.json(country);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Searching by alpha3Code
app.get(`/alpha/:alpha`, async (req, res) => {
  const alpha = req.params.alpha;
  const newAlpha = alpha.toUpperCase();

  try {
    const country = await Country.find({ alpha: newAlpha });
    country.length == 0
      ? res.json({ status: 404, message: 'Region Not Found' })
      : res.json(country);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Searching by region/name
app.get(`/:region/:name`, async (req, res) => {
  const region = req.params.region;
  const newRegion =
    region[0].toUpperCase() + region.slice(1).toLocaleLowerCase();

  const name = req.params.name;
  const newName = new RegExp(
    name[0].toUpperCase() + name.slice(1).toLocaleLowerCase(),
    'i'
  );

  try {
    const country = await Country.find({
      region: newRegion,
      name: newName,
    });
    country.length == 0
      ? res.json({ status: 404, message: 'Country Not Found' })
      : res.json(country);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.use((req, res) =>
  res.status(404).json({ status: 404, message: 'Search Not Found' })
);

// connect to mongodb
const dbURI = process.env.DBURI;
const port = process.env.PORT || 3000;

mongoose
  .connect(dbURI)
  .then(result => {
    app.listen(port);
  })
  .catch(err => console.log(err));
