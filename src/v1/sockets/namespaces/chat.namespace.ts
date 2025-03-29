import { Namespace, Socket } from 'socket.io';
import * as console from 'node:console';

export default function chatNamespace(namespace: Namespace) {
  namespace.on('connection', (socket: Socket) => {
    console.log(`🟢 [/chat] Connected: ${socket.id}`);

    socket.on('join', ({ roomId }) => {
      console.log(`🔗 ${socket.id} joined room ${roomId}`);
      socket.join(roomId);
      socket.to(roomId).emit('join', `${socket.id} joined room ${roomId}`);
    });

    socket.on('message', ({ roomId, message }) => {
      console.log(`💬 ${socket.id} sent message to room ${roomId}: ${message}`);
      socket.to(roomId).emit('message', message);
    });

    socket.on('disconnect', () => {
      console.log(`🔴 [/chat] Disconnected: ${socket.id}`);
    });
  });
}
