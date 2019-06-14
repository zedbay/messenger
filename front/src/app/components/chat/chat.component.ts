import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import { ChatService } from '../../services/chat.service';
import { Observable } from 'rxjs';
import { Message, User } from '../../models/chat.model';
import { NetworkService } from 'src/app/services/network.service';

@Component({
    selector: 'app-chat',
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

    public whoami: string = 'Antoine';
    public message: string;
    public messages: Message[] = [];
    private onMessage: Observable<Message>;

    constructor(
        private chatService: ChatService,
        private networkService: NetworkService) { }

    ngOnInit() {
        this.onMessage = this.chatService.onMessage();
        this.onMessage.subscribe((data: Message) => {
            this.onReceivedMessage(data);
        });
        this.chatService.notifyChangementOfServer.subscribe((nameServer: string) => {
            this.onChangeServer(nameServer);
        });
    }

    private onReceivedMessage(message: Message) {
        this.messages.push(message);
    }

    public onSend(form: NgForm) {
        this.chatService.send(form.value.message);
    }

    private onChangeServer(newvalue: string) {
        this.messages = [];
        this.networkService.get('/server/' + newvalue).subscribe((messages) => {
            for (let i = 0; i < messages.messages.length; i++) {
                let user = new User(messages.users[i].properties.firstName + " " + messages.users[i].properties.name);
                let message = new Message(user, messages.messages[i].properties.content, newvalue);
                this.messages.push(message);
            }
        });
    }

}
