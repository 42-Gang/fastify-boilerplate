import { Server } from 'socket.io';
import { FastifyInstance } from 'fastify';
import { registerSocketGateway } from './v1/sockets/gateway.js';

interface ServerToClientEvents {
  noArg: () => void;
  basicEmit: (a: number, b: string, c: Buffer) => void;
  withAck: (d: string, callback: (e: number) => void) => void;
}

interface ClientToServerEvents {
  hello: () => void;
}

interface InterServerEvents {
  ping: () => void;
}

interface SocketData {
  name: string;
  age: number;
}

export function createSocketServer(fastify: FastifyInstance) {
  const socket = new Server<
    ClientToServerEvents,
    ServerToClientEvents,
    InterServerEvents,
    SocketData
  >(fastify.server, {
    cors: {
      origin: '*',
    },
  });

  socket.on('connection', (socket) => {
    fastify.log.info('Client connected');
    socket.on('disconnect', () => {
      fastify.log.info('Client disconnected');
    });
  });
  registerSocketGateway(socket);
}
