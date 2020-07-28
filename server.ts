import 'zone.js/dist/zone-node';

import { ngExpressEngine } from '@nguniversal/express-engine';
import * as express from 'express';
import { join } from 'path';

import { AppServerModule } from './src/main.server';
import { APP_BASE_HREF } from '@angular/common';
import { existsSync } from 'fs';
import * as mongoose from 'mongoose';
import * as bodyParser from 'body-parser';
import { RoleRoute } from 'src/app/backend/api-routes/role.route';
import { createRoles } from 'src/app/backend/bootstrap/create-deafal-roles';
import { UserRoute } from 'src/app/backend/api-routes/user.route';


const config = JSON.parse(process.env.APP_CONFIG  || '{}');
// The Express app is exported so that it can be used by serverless Functions.
export function app() {
  const connectin = process.env.APP_CONFIG ? 'mongodb://' + config.mongo.user + ':' + encodeURIComponent('a2sevenpwd') + '@' +
  config.mongo.hostString : 'mongodb://localhost/interview-task';
  // Routes
  const roleRoute: RoleRoute = new RoleRoute();
  const userRoute: UserRoute = new UserRoute();

  const server = express();
  const distFolder = join(process.cwd(), 'dist/test/browser');
  const indexHtml = existsSync(join(distFolder, 'index.original.html'))
    ? 'index.original.html'
    : 'index';

  // Our Universal express-engine (found @ https://github.com/angular/universal/tree/master/modules/express-engine)
  server.engine(
    'html',
    ngExpressEngine({
      bootstrap: AppServerModule,
    })
  );

  server.use(bodyParser.json());
  server.use(bodyParser.urlencoded({ extended: true }));

  // MongoDB database settings
  mongoose
    .connect(connectin, {
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    })
    .then(async () => {
      console.log('Database connected successfully!');
      await createRoles();
    })
    .catch((err) => console.error(err));

  roleRoute.roleRoute(server);
  userRoute.userRoute(server);

  server.set('view engine', 'html');
  server.set('views', distFolder);

  // Example Express Rest API endpoints
  // server.get('/api/**', (req, res) => { });
  // Serve static files from /browser
  server.get(
    '*.*',
    express.static(distFolder, {
      maxAge: '1y',
    })
  );

  // All regular routes use the Universal engine
  server.get('*', (req, res) => {
    res.render(indexHtml, {
      req,
      providers: [{ provide: APP_BASE_HREF, useValue: req.baseUrl }],
    });
  });

  return server;
}

function run() {
  const port = 3000;

  // Start up the Node server
  const server = app();
  server.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

// Webpack will replace 'require' with '__webpack_require__'
// '__non_webpack_require__' is a proxy to Node 'require'
// The below code is to ensure that the server is run only when not requiring the bundle.
declare const __non_webpack_require__: NodeRequire;
const mainModule = __non_webpack_require__.main;
const moduleFilename = (mainModule && mainModule.filename) || '';
if (moduleFilename === __filename || moduleFilename.includes('iisnode')) {
  run();
}

export * from './src/main.server';
