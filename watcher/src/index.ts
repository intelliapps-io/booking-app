const bodyParser = require('body-parser');
import express from 'express'
import crypto from 'crypto'
import pm2 from 'pm2'
import { rebuildApp } from './rebuildApp';
import { getPm2Process, nodeLogger } from './helpers';

const main = async () => {
  if (!process.env.PORT)
    return nodeLogger('NO PORT PROVIDED AS ENV VAR')

  const port = process.env.PORT, guid = '2g948693-12dc-406a-8927-r753z56jd489'
  const app = express()

  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: false }));

  app.post('/github', (req, res) => {
    if (req.body.ref !== 'refs/heads/master')
      return
    const signature = req.headers['x-hub-signature'];
    const hash = `sha1=${crypto.createHmac('sha1', guid).update(JSON.stringify(req.body)).digest('hex')}`
    if (hash !== signature)
      return nodeLogger('hash !== signature')
    nodeLogger('Git Push Made and Accepts')
    // hanlde pm2 update
    rebuildApp()
      .catch(err => nodeLogger('ERROR BUILDING APP'))
      .then(async () => {
        const pm2Process = await getPm2Process('Worksoft Systems').catch(err => nodeLogger(err))
        if (!pm2Process)
          return nodeLogger('Error, no pm2Process found to restart')
        pm2.restart(pm2Process.pm_id!, (err, proc) => {
          if (err)
            return nodeLogger(err)
          else
          nodeLogger('Process Restarted!')
        })
      })
  })

  app.get('/', (req, res) => {
    res.send('Welcome')
  })

  app.listen(port)
  console.log(`Watcher listening on port http://localhost:${port}`)
}

main().catch(err => console.error(err))