import express from 'express'

const main = async () => {
  const port = 9001, guid = '2g948693-12dc-406a-8927-r753z56jd489'
  const app = express()

  
  app.listen(port)
  console.log(`Watcher listening on port ${9001}`)
}

main().catch(err => console.error(err))