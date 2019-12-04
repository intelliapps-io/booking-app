require('dotenv').config();
import "reflect-metadata";
import Express from "express";
import cookieParser from "cookie-parser";
import cors, { CorsOptions } from "cors";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { createConnection } from "typeorm";

import { resolvers } from "./modules/resolvers";
import { authMiddleware, authChecker } from "./helpers/auth";
import { runCodegen, nodeLogger } from "./helpers/helpers";
import { sendEmail } from "./helpers/sendEmail";
import { join } from "path";

const main = async () => {
  const httpPort = process.env.NODE_ENV === 'production' ? 80 : 3001;

  // Connect to Postgres DB
  const connect = () => new Promise((resolve, reject) => {
    let attempts = 0, maxAttempts = 10;
    const interval = setInterval(
      () => createConnection()
        .then(() => { clearInterval(interval); resolve(); })
        .catch(error => attempts > maxAttempts ? reject(error) : attempts++),
      500
    );
  });
  await connect()
    .catch(err => { throw err });

  // Generate TypeGraphQL Schema 
  const schema = await buildSchema({
    resolvers,
    authChecker,
    emitSchemaFile: {
      path: "./src/graphql/generated-schema.graphql"
    }
  });

  // Create GraphQL Server
  const apolloServer = new ApolloServer({
    schema,
    context: ({ req, res }) => ({ req, res })
  });

  // Create Express Web Server
  const app = Express();

  // Read authentication cookies from requests
  app.use(cookieParser())

  // CORS
  var corsOptions: CorsOptions = {
    credentials: true,
    origin: true
  }
  app.use(cors(corsOptions));

  // Configure JWT-Authentication
  app.use(authMiddleware);

  // Integrate GraphQL Server with Express
  apolloServer.applyMiddleware({ app, cors: corsOptions });

  // Foward React Doc For Production
  if (process.env.NODE_ENV === "production") {
    const buildFolder = join(__dirname, "../", "../", "client", "build");
    const indexHtml = join(buildFolder, "index.html");
    app.use("/", Express.static(buildFolder))
    app.get('/', (req, res, next) => {
      res.sendFile(indexHtml);
    })
  }

  app.listen(httpPort, () => console.log(`
  > GraphQL: http://localhost:${httpPort}/graphql
  
  > pgAdmin: http://localhost:5050
       - email: admin@local.host
       - password: postgres

  > postgres: 
       - username: postgres
       - password: postgres
  `));

  // Generate Client Code
  await runCodegen().catch(err => { });
}

main(); 