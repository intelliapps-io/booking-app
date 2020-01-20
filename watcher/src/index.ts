const bodyParser = require('body-parser');
import express from 'express'
import crypto from 'crypto'
import pm2 from 'pm2'
import { rebuildApp } from './rebuildApp';

const main = async () => {
  if (!process.env.PORT)
    return console.error('NO PORT PROVIDED AS ENV VAR')

  const port = process.env.PORT, guid = '2g948693-12dc-406a-8927-r753z56jd489'
  const app = express()

  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: false }));

  // pm2.connect((err) => { if (err) console.error(err) })
  // pm2.list((err, data) => {
  //   if (err)
  //     return console.error(err)
  //   console.log(data)
  // })

  rebuildApp()
    .then(() => 'done building app')
    .catch(err => console.log('ERROR BUILDING APP'))

  app.post('/github', (req, res) => {
    if (req.body.ref !== 'refs/heads/master')
      return
    const signature = req.headers['x-hub-signature'];
    const hash = `sha1=${crypto.createHmac('sha1', guid).update(JSON.stringify(req.body)).digest('hex')}`
    if (hash !== signature)
      return console.log('hash !== signature')
    // hanlde pm2 update

  })

  app.get('/', (req, res) => {
    res.send('Welcome')
  })

  app.listen(port)
  console.log(`Watcher listening on port ${9001}`)
}

main().catch(err => console.error(err))