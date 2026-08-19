import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({ cors: { origin: '*' } })
export class TrackingGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('join-shift-room')
  handleJoinRoom(
    @MessageBody()
    data: { shiftId: string; role: 'professional' | 'institution' },
    @ConnectedSocket() client: Socket,
  ) {
    const room = `shift_${data.shiftId}`;
    void client.join(room);
    console.log(`Client ${client.id} joined room ${room} as ${data.role}`);

    // Notify the room that someone joined
    void this.server
      .to(room)
      .emit('user-joined', { role: data.role, clientId: client.id });
  }

  @SubscribeMessage('location-update')
  handleLocationUpdate(
    @MessageBody()
    data: { shiftId: string; lat: number; lng: number; heading?: number },
    @ConnectedSocket() client: Socket,
  ) {
    const room = `shift_${data.shiftId}`;
    // Broadcast the location to everyone else in the room (e.g., the institution dashboard)
    void client.to(room).emit('professional-location', {
      lat: data.lat,
      lng: data.lng,
      heading: data.heading,
      timestamp: new Date().toISOString(),
    });
  }
}
