const bodyParser = require('body-parser');
import express from 'express'
import crypto from 'crypto'
import pm2 from 'pm2'
import { rebuildApp } from './rebuildApp';
import { getPm2Process, nodeLogger } from './helpers';
import CreateSocketIO from 'socket.io'
import path from 'path'

const main = async () => {
  const app = express(), port = process.env.PORT, guid = '2g948693-12dc-406a-8927-r753z56jd489'
  if (!process.env.PORT)
    return nodeLogger('NO PORT PROVIDED AS ENV VAR')

  const server = require('http').Server(app)
  const io = CreateSocketIO(server)  

  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: false }));

  // GitHub WebHook
  app.post('/github', (req, res) => {
    if (req.body.ref !== 'refs/heads/master')
      return
    const signature = req.headers['x-hub-signature'];
    const hash = `sha1=${crypto.createHmac('sha1', guid).update(JSON.stringify(req.body)).digest('hex')}`
    if (hash !== signature)
      return nodeLogger('hash !== signature')
    nodeLogger('Git Push Made and Accepts')
    // hanlde pm2 update
    rebuildApp(io)
      .catch(err => nodeLogger('ERROR BUILDING APP'))
      .then(async () => {
        /**
         * pm2 now auto watches for server & client updates
         */

        // const pm2Process = await getPm2Process('Worksoft Systems').catch(err => nodeLogger(err))
        // if (!pm2Process)
        //   return nodeLogger('Error, no pm2Process found to restart')
        // pm2.restart(pm2Process.pm_id!, (err, proc) => {
        //   if (err)
        //     return nodeLogger(err)
        //   else
        //   nodeLogger('Process Restarted!')
        // })
      })
  })

  // Index Route
  app.get('/', function (req, res) {
    res.sendFile(path.resolve(__dirname + '/../common/index.html'));
  });

  server.listen(port)
  console.log(`Watcher listening on port http://localhost:${port}`)
}

main().catch(err => console.error(err))