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
        name: 'Git Pull',
        options: {
          command: 'sudo',
          commandOptions: ['git', 'pull', '-key', '/home/ubuntu/.ssh/id_rsa'],
          options: { cwd: '/var/node-app/server' }
        }
      },
      // {
      //   name: 'Create Temp Server Build Directory',
      //   options: {
      //     command: 'mkdir',
      //     commandOptions: ['/var/node-app-temp']
      //   }
      // },
      // {
      //   name: 'Create Temp Server Build Directory',
      //   options: {
      //     command: 'mkdir',
      //     commandOptions: ['/var/node-app-temp/server']
      //   }
      // },
      // {
      //   name: 'Copy Existing Server Files',
      //   options: {
      //     command: 'rsync',
      //     commandOptions: [
      //       '-av',
      //       '--progress',
      //       '/var/node-app/server/.',
      //       '/var/node-app-temp/server',
      //       '--exclude',
      //       'node_modules'
      //     ]
      //   }
      // },
      // {
      //   name: 'Install Server Packages',
      //   options: {
      //     command: 'npm',
      //     commandOptions: ['i'],
      //     options: { cwd: '/var/node-app-temp/server' }
      //   }
      // },
      // {
      //   name: 'GraphQL Generator',
      //   options: {
      //     command: 'npm',
      //     commandOptions: ['run', 'gen'],
      //     options: { cwd: '/var/node-app-temp/server' }
      //   }
      // },
      // {
      //   name: 'Build Server',
      //   options: {
      //     command: 'tsc',
      //     options: { cwd: '/var/node-app-temp/server' }
      //   }
      // },
      // {
      //   name: 'Create Temp Client Build Directory',
      //   options: {
      //     command: 'mkdir',
      //     commandOptions: ['/var/node-app-temp/client']
      //   }
      // },
      // {
      //   name: 'Copy Existing Client Files',
      //   options: {
      //     command: 'rsync',
      //     commandOptions: [
      //       '-av',
      //       '--progress',
      //       '/var/node-app/client/.',
      //       '/var/node-app-temp/client',
      //       '--exclude',
      //       'node_modules'
      //     ]
      //   }
      // },
      // {
      //   name: 'Install Client Packages',
      //   options: {
      //     command: 'yarn',
      //     commandOptions: ['install'],
      //     options: { cwd: '/var/node-app-temp/client' }
      //   }
      // },
      // {
      //   name: 'Build Client',
      //   options: {
      //     command: 'yarn',
      //     commandOptions: ['build'],
      //     options: { cwd: '/var/node-app-temp/client' }
      //   }
      // },
      // // at this point, the build process had no errors
      // // copy server
      // {
      //   name: 'Delete Server Directory',
      //   options: {
      //     command: 'rm',
      //     commandOptions: ['-rf', 'server'],
      //     options: { cwd: '/var/node-app' }
      //   }
      // },
      // {
      //   name: 'Create Server Directory',
      //   options: {
      //     command: 'mkdir',
      //     commandOptions: ['/var/node-app/server'],
      //   }
      // },
      // {
      //   name: 'Copy Temp Server to Server',
      //   options: {
      //     command: 'rsync',
      //     commandOptions: [
      //       '-av',
      //       '--progress',
      //       '/var/node-app-temp/server/.',
      //       '/var/node-app/server',
      //       '--exclude',
      //       'node_modules'
      //     ]
      //   }
      // },
      // {
      //   name: 'Install Server Packages',
      //   options: {
      //     command: 'npm',
      //     commandOptions: ['i'],
      //     options: { cwd: '/var/node-app/server' }
      //   }
      // },
      // // copy client
      // {
      //   name: 'Delete Client Directory',
      //   options: {
      //     command: 'rm',
      //     commandOptions: ['-rf', 'client'],
      //     options: { cwd: '/var/node-app' }
      //   }
      // },
      // {
      //   name: 'Create Client Directory',
      //   options: {
      //     command: 'mkdir',
      //     commandOptions: ['/var/node-app/client'],
      //   }
      // },
      // {
      //   name: 'Copy Temp Server to Client',
      //   options: {
      //     command: 'rsync',
      //     commandOptions: [
      //       '-av',
      //       '--progress',
      //       '/var/node-app-temp/client/.',
      //       '/var/node-app/client',
      //       '--exclude',
      //       'node_modules'
      //     ]
      //   }
      // },
      // {
      //   name: 'Install Client Packages',
      //   options: {
      //     command: 'yarn',
      //     commandOptions: ['install'],
      //     options: { cwd: '/var/node-app/client' }
      //   }
      // },
    ]

    for (let i = 0; i < steps.length; i++) {
      const stepNumber = i + 1, step = steps[i], { command, commandOptions, options } = step.options
      console.log(`[${stepNumber}/${steps.length}] ${step.name}`)
      await run({ command, commandOptions, options })
        .then(res => console.log(`DONE[${stepNumber}/${steps.length}]: ${step.name}`))
        .catch(err => reject(err))
    }

  })
}