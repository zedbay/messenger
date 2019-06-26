
import { createServer, Server } from 'http';
import * as socketIo from 'socket.io';
import { Express } from "express";
import * as config from '../config.json';
import { Security } from './security/security';
import { Room } from './models/room.model';


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
		socket.on('message', (informations: any) => {
			this.onMessage(informations);
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
			// Message.adminMessage('1 user left the room', informations.roomName)
		);
		socket.leave(informations.roomName);
	}

	private async joinRoom(socket: any, informations: any) {
		if (!Security.tokenIsOk(informations.token)) {
			return;
		}
		const claims = Security.getIdentity(informations.token);
		let resultat = await Room.search(informations.user, claims.get('id'));
		if (!resultat) {
			resultat = await Room.create(informations.user, claims.get('id'));
		}
		socket.join(resultat.properties.name);
	}

	private async onMessage(informations: any) {
		if (!Security.tokenIsOk(informations.token)) {
			return;
		}
		const claims = Security.getIdentity(informations.token);
		const room = await Room.search(claims.get('id'), informations.user);
		const resultat = await Room.addMessageInRoom(claims.get('id'), informations.user, informations.content);
		if (resultat) this.io.to(room.properties.name).emit('message', { resultat });
	}
}