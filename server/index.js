const express = require('express');
const bodyParser = require('body-parser');

const psqlHelper = require('../database/postgres');
const db = require('../database/db');
const jobQueue = require('../database/index');

// SETUP
const app = express();
app.use(bodyParser.json());
app.use((req, res, next) => {
  console.log(`${req.path}, ${req.method}, ${req.status}, ${JSON.stringify(req.body)}`);
  next();
});
app.use(require('body-parser').urlencoded({ extended: true }));
app.listen(process.env.PORT || 3001);

// POST
app.post('/enqueue/*', async(req, res, next) => {
  // add new job to queue
  const output = await jobQueue.enqueue(req.url.slice(9));
  res.status(201).json({ output });
});

// GET
app.get('/:id', async(req, res, next) => {
  // check job status by id
  const output = await jobQueue.status(req.params.id);
  res.status(200).json({ output });
});

// DEVELOPMENT
// app.get('/all', async(req, res, next) => {
//   // all
//   const output = await jobQueue.all();
//   res.status(200).json({ output });
// });