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
      // Create Temp Directories
      {
        name: 'Create Temp Build Directory',
        options: {
          command: 'mkdir',
          commandOptions: ['/var/node-app-temp']
        }
      },
      {
        name: 'Create Temp Clone Directory',
        options: {
          command: 'mkdir',
          commandOptions: ['/var/gitTemp']
        }
      },
      {
        name: 'Modify Temp Clone Directory Permissons',
        options: {
          command: 'chmod',
          commandOptions: ['777', '/var/gitTemp']
        }
      },
      // CREATE ROOT .ssh
      {
        name: 'Make Root .ssh Folder',
        options: {
          command: 'mkdir',
          commandOptions: [ '-p', '/root/.ssh'],
          options: { cwd: '/var/gitTemp/' }
        }
      },
      {
        name: 'Add Git SSH Key To Root',
        options: {
          command: 'cp',
          commandOptions: [ '/var/node-app/docker/build-files/git-ssh/id_rsa', '/root/.ssh' ]
        }
      },
      {
        name: 'Modify Git SSH Permissions',
        options: {
          command: 'chmod',
          commandOptions: ['700', '/root/.ssh/id_rsa']
        }
      },
      {
        name: 'Trust New Git SSH',
        options: {
          command: 'ssh-keyscan',
          commandOptions: ['-t', 'rsa', 'github.com', '>>', '/root/.ssh/known_hosts']
        }
      },
      {
        name: 'Clone Git Into Temp',
        options: {
          command: 'git',
          commandOptions: ['clone', 'git@github.com:intelliapps-io/booking-app.git'],
          options: { cwd: '/var/gitTemp' }
        }
      },
      // Move Git Temp into Node App Temp
      {
        name: 'Clone Git Into Temp',
        options: {
          command: 'cp',
          commandOptions: ['-a', '/var/gitTemp/booking-app/.', '/var/node-app-temp/'],
        }
      },
      {
        name: 'Delete Git Temp Directory',
        options: {
          command: 'rm',
          commandOptions: ['-rf', '/var/gitTemp'],
        }
      },
      {
        name: 'Install Server Packages',
        options: {
          command: 'npm',
          commandOptions: ['i'],
          options: { cwd: '/var/node-app-temp/server' }
        }
      },
      {
        name: 'GraphQL Generator',
        options: {
          command: 'npm',
          commandOptions: ['run', 'gen'],
          options: { cwd: '/var/node-app-temp/server' }
        }
      },
      {
        name: 'Build Server',
        options: {
          command: 'tsc',
          options: { cwd: '/var/node-app-temp/server' }
        }
      },
      {
        name: 'Generate Type-GraphQL Schema',
        options: {
          command: 'node',
          commandOptions: ['buildSchemaToDist.js'],
          options: { cwd: '/var/node-app-temp/server/dist/helpers' }
        }
      },
      {
        name: 'Install Client Packages',
        options: {
          command: 'yarn',
          commandOptions: ['install'],
          options: { cwd: '/var/node-app-temp/client' }
        }
      },
      {
        name: 'Build Client',
        options: {
          command: 'yarn',
          commandOptions: ['build'],
          options: { cwd: '/var/node-app-temp/client' }
        }
      },
      // at this point, the build process had no errors
      // clean up rebuild process
      {
        name: 'Delete Server Directory',
        options: {
          command: 'rm',
          commandOptions: ['-rf', 'server'],
          options: { cwd: '/var/node-app' }
        }
      },
      {
        name: 'Create Server Directory',
        options: {
          command: 'mkdir',
          commandOptions: ['/var/node-app/server'],
        }
      },
      {
        name: 'Copy Temp Server to Server',
        options: {
          command: 'rsync',
          commandOptions: [
            '-av',
            '--progress',
            '/var/node-app-temp/server/.',
            '/var/node-app/server',
            '--exclude',
            'node_modules'
          ]
        }
      },
      {
        name: 'Install Server Packages',
        options: {
          command: 'npm',
          commandOptions: ['i'],
          options: { cwd: '/var/node-app/server' }
        }
      },
      // copy client
      {
        name: 'Delete Client Directory',
        options: {
          command: 'rm',
          commandOptions: ['-rf', 'client'],
          options: { cwd: '/var/node-app' }
        }
      },
      {
        name: 'Create Client Directory',
        options: {
          command: 'mkdir',
          commandOptions: ['/var/node-app/client'],
        }
      },
      {
        name: 'Copy Temp Server to Client',
        options: {
          command: 'rsync',
          commandOptions: [
            '-av',
            '--progress',
            '/var/node-app-temp/client/.',
            '/var/node-app/client',
            '--exclude',
            'node_modules'
          ]
        }
      },
      {
        name: 'Install Client Packages',
        options: {
          command: 'yarn',
          commandOptions: ['install'],
          options: { cwd: '/var/node-app/client' }
        }
      },
      {
        name: 'Delete Temp Node App Directory',
        options: {
          command: 'rm',
          commandOptions: ['-rf', '/var/node-app-temp']
        }
      }
    ]

    for (let i = 0; i < steps.length; i++) {
      const stepNumber = i + 1, step = steps[i], { command, commandOptions, options } = step.options
      console.log(`[${stepNumber}/${steps.length}] ${step.name}`)
      await run({ command, commandOptions, options })
        .then(res => console.log(`DONE[${stepNumber}/${steps.length}]: ${step.name}`))
        .catch(err => reject(err))
    }
    
    console.log('done building app')
    resolve()
  })
}