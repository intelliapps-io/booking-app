import cp, { spawn, SpawnOptionsWithoutStdio } from 'child_process'

type RunOptions = { command: string, commandOptions?: string[], options?: SpawnOptionsWithoutStdio | undefined }

const run = ({ command, commandOptions, options }: RunOptions): Promise<string> =>
  new Promise((resolve, reject) => {
    const cmd = spawn(command, commandOptions, options)
    cmd.stderr.on("data", data => process.stderr.write(data))
    cmd.stdout.on("data", data => process.stdout.write(data))
    cmd.on('error', (error) => reject(error))
    cmd.on("close", code => { if (code !== 0) reject(new Error(`child process exited with code ${code}`)); else resolve(`child process exited with code ${code}`) });
  })

interface Step {
  name: string,
  options: RunOptions
}

export function rebuildApp(): Promise<any> {
  return new Promise(async (resolve: (data?: any) => void, reject: (err: Error) => void) => {
    console.log('Rebuilding App')

    const steps: Step[] = [
      {
        name: 'Create Temp Build Directory',
        options: {
          command: 'mkdir',
          commandOptions: ['server_temp'],
          options: { cwd: '/var/node-app' }
        }
      },
      {
        name: 'Copy Existing Server Files',
        options: {
          command: 'rsync',
          commandOptions: [
            '-av',
            '--progress',
            '/var/node-app/server',
            '/var/node-app/server_temp',
            '--exclude',
            'node_modules'
          ],
          options: { cwd: '/var/node-app' }
        }
      },
      {
        name: 'Install Server Packages',
        options: {
          command: 'npm',
          commandOptions: ['i'],
          options: { cwd: '/var/node-app/server_temp' }
        }
      },
      {
        name: 'GraphQL Generator',
        options: {
          command: 'npm',
          commandOptions: ['run', 'gen'],
          options: { cwd: '/var/node-app/server_temp' }
        }
      },
      {
        name: 'Build Server',
        options: {
          command: 'tsc',
          options: { cwd: '/var/node-app/server_temp' }
        }
      }
    ]

    for (let i = 0; i < steps.length; i++) {
      const stepNumber = i + 1, step = steps[i]
      console.log(`[${stepNumber}/${steps.length}] ${step.name}`)
      await run({ command: 'npm', commandOptions: ['i'], options: { cwd: '/var/node-app/server' } })
        .then(res => console.log(`DONE[${stepNumber}/${steps.length}]: ${step.name}`))
        .catch(err => reject(err))
    }



  })
}