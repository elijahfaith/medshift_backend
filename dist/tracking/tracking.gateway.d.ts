import { OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
export declare class TrackingGateway implements OnGatewayConnection, OnGatewayDisconnect {
    server: Server;
    handleConnection(client: Socket): void;
    handleDisconnect(client: Socket): void;
    handleJoinRoom(data: {
        shiftId: string;
        role: 'professional' | 'institution';
    }, client: Socket): void;
    handleLocationUpdate(data: {
        shiftId: string;
        lat: number;
        lng: number;
        heading?: number;
    }, client: Socket): void;
}
