import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import { ChatService } from '../../services/chat.service';
import { NetworkService } from 'src/app/services/network.service';

@Component({
    selector: 'app-chat',
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

    public message: string;
	public messages: any[] = [];
	public currentIdUser: number;

    constructor(
        private chatService: ChatService,
        private networkService: NetworkService) { }

    ngOnInit() {
        this.chatService.onMessage().subscribe((data: any) => {
            this.onReceivedMessage(data);
        });
        this.chatService.notifyChangementOfServer.subscribe((idUser: number) => {
			this.currentIdUser = idUser;
			this.onChangeServer();
        });
    }

    private onReceivedMessage(message: any) {
		this.messages.push(message.resultat);
    }

    public onSend(form: NgForm) {
		this.chatService.send(this.currentIdUser ,this.message);
		this.message = "";
    }

    private onChangeServer() {
		this.messages = [];
		this.networkService.get('/room/' + this.currentIdUser).subscribe((messages) => {
			console.log(messages);
		});
    }

}
