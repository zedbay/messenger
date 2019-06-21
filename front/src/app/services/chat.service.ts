import { Injectable, EventEmitter } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs';
@Injectable({
	providedIn: 'root'
})
export class ChatService {

	private socket;
	public notifyChangementOfServer: EventEmitter<any> = new EventEmitter<any>();

	constructor() {
		this.connect();
	}

	private connect() {
		this.socket = io('http://localhost:8085');
	}

	public onChangeChatServer(userID: number) {
		this.socket.emit('joinRoom', {
			token: localStorage.getItem('token'),
			user: userID
		});
		this.notifyChangementOfServer.emit(userID);
	}

	public getMessagesForRoom() {
		
	}

	public send(userID: number, message: string) {
		this.socket.emit('message', {
			token: localStorage.getItem('token'),
			user: userID,
			content: message
		});
	}

	public onMessage(): Observable<any> {
		return new Observable<any>(observer => {
			this.socket.on('message', (data: any) => {
				observer.next(data);
			});
		});
	}
}
