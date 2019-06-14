import { Injectable, EventEmitter } from '@angular/core';
import * as io from 'socket.io-client';
import { User, Message } from '../models/chat.model';
import { Observable } from 'rxjs';
import { NetworkService } from './network.service';

@Injectable({
	providedIn: 'root'
})
export class ChatService {

	private socket;
	private currentRoom: string;
	public notifyChangementOfServer: EventEmitter<string> = new EventEmitter<string>();
	public notifyServerChangement: EventEmitter<any> = new EventEmitter<any>();

	constructor(private networkService: NetworkService) {
		this.connect();
		this.loadServer();
	}

	private connect() {
		this.socket = io('http://localhost:8085');
	}

	private loadServer() {
		this.networkService.get('/server').subscribe((servers) => {
			this.notifyServerChangement.emit(
				servers.data.map(element => element.properties.name)
			);
		});
	}

	public onChangeChatServer(newServerName : string) {
		this.socket.emit('leaveRoom', { roomName: this.currentRoom });
		this.currentRoom = newServerName;
		this.notifyChangementOfServer.emit(newServerName);
		this.socket.emit('joinRoom', { roomName: newServerName });
	}

	public onAddServer(name: string) {
		this.networkService.post('/server', { newName: name }).subscribe(() => {
			this.loadServer();
			this.onChangeChatServer(name);
		});
	}

	public onRemoveServer(name: string) {
		this.networkService.delete('/server/' + name).subscribe(() => {
			this.loadServer();
		});
	}

	public send(content: string): void {
		const user = new User("test", localStorage.getItem('token'));
		const message = new Message(user, content, this.currentRoom);
		this.socket.emit('message', message);
	}

	public onMessage(): Observable<Message> {
		return new Observable<Message>(observer => {
			this.socket.on('message', (data: Message) => {
				observer.next(data);
			});
		});
	}
}
