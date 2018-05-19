const knex = require('./db');
const shortid = require('shortid');
const https = require('https');

let queue = []; // a queue to store all jobs to be processed

const enqueue = async(url) => {
  const id = shortid.generate();
  const html = 'still working';
  url = url.replace('http:', 'https:');
  if (!url.startsWith('https:')) url = 'https://' + url;
  queue.push({ id, url });
  await knex('jobs').insert({ id, url, html });
  return id;
};

const status = async(id) => {
  const html = await knex('jobs').where({ id }).select('html');
  return html.length ? html : 'invalid job ID.';
};

const go = () => {
  // process top 100 items in queue
  if (!queue.length) return;
  console.log('queue', queue);
  const data = queue.splice(0, 100);
  for (let i = 0; i < data.length; i++) {
    let { id, url } = data[i];
    const req = https.get(url, res => {
      res.setEncoding('utf8');
      let html = '';
      res.on('data', data => {
        html += data;
      });
      res.on('end', async() => {
        await knex('jobs').where({ id }).update({ html });
      });
    });
    req.on('error', err => {
      console.log('req error ', err);
      req.end();
    });
    req.end();
  }
};

// const all = async() => await knex('jobs').select();

setInterval(() => {
  go();
}, 1000);


module.exports = {
  enqueue,
  status,
  // all,
};
