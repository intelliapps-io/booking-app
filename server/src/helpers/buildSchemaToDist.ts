import { buildSchema } from "type-graphql";
import { resolvers } from "../modules/resolvers"
import { authChecker } from "./auth"
import { exec } from "child_process"

function buildSchemaToDist() {
  try {
    exec('mkdir /var/node-app/server/dist/graphql')
  } catch (err) {
    console.log('could not make /dist/graphql')
  } 
  return new Promise(async (resolve: (data?: any) => void, reject: (err: Error) => void) => {
    await buildSchema({
      resolvers,
      authChecker,
      emitSchemaFile: {
        path: `/var/node-app/server/dist/graphql/generated-schema.graphql`
      }
    });
  })
}

console.log('Building Schema')
buildSchemaToDist()
  .then(() => console.log('Schema bBuild Successfully'))
  .catch(() => console.log('Error Bulding Schema'))