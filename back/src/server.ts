
import { createServer, Server } from 'http';
import * as socketIo from 'socket.io';
import { Express } from "express";
import * as config from '../config.json';
import { Security } from './security/security';
import { MessageHandler } from './handlers/message.handlers';
import { Message } from './models/message.model';


export class MyServer {

    public server: Server;
    public io: SocketIO.Server;

    constructor(express: Express) {
        this.server = createServer(express);
        this.io = socketIo(this.server);
        this.io.on('connect', (socket: any) => {
            this.onConnect(socket);
        });
    }

    private onConnect(socket: any) {
        socket.on('message', (m: Message) => {
            this.onMessage(m);
        });
        socket.on('leaveRoom', (roomName: any) => {
            this.leaveRoom(socket, roomName);
        });
        socket.on('joinRoom', (informations: any) => {
            this.joinRoom(socket, informations);
        });
    }

    private leaveRoom(socket: any, informations: any) {
        this.io.to(informations.roomName).emit('message',
            Message.adminMessage('1 user left the room', informations.roomName)
        );
        socket.leave(informations.roomName);
    }

    private joinRoom(socket: any, informations: any) {
        if (!Security.tokenIsOk(informations.token)) {
            return;
        }
        const claims = Security.getIdentity(informations.token);
        const name = claims.get('firstName') + ' ' + claims.get('name');
        this.io.to(informations.roomName).emit('message',
            Message.adminMessage(name + ' join the room', informations.roomName)
        );
        socket.join(informations.roomName);
    }

    private async onMessage(m: Message) {
        if (!Security.tokenIsOk(m.from.token)) {
            return;
        }
        let res = await MessageHandler.add(m).catch(() => { console.error('[server:onMessage] échec'); });
        if (res) this.io.to(m.room).emit('message', m);
    }
}