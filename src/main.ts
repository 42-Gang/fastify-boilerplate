import { createServer, startServer } from './server-utils.js';
import { configureServer, registerPlugins, setupGracefulShutdown } from './server-config.js';
import { createSocketServer } from './socket.js';

async function init() {
  const server = createServer();
  await configureServer(server);
  await registerPlugins(server);
  await setupGracefulShutdown(server);

  await server.ready();
  await startServer(server);

  createSocketServer(server);
}

init();
