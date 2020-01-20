import pm2 from 'pm2'

export function getPm2Process(name: string): Promise<pm2.ProcessDescription> {
  return new Promise((resolve: (pm2Process: pm2.ProcessDescription) => void, reject: (err: Error) => void) => {
    pm2.list((err, data) => {
      if (err)
        return reject(err)
      const pm2Process = data.find(_process => _process.name === name)
      if (!pm2Process)
        return reject(new Error(`No process with name '${name}' found`))
      else
        resolve(pm2Process!)
    })
  })
}