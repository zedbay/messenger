import { Component, OnInit } from '@angular/core';
import { NetworkService } from 'src/app/services/network.service';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-chat-selector',
  templateUrl: './chat-selector.component.html',
  styleUrls: ['./chat-selector.component.scss']
})
export class ChatSelectorComponent implements OnInit {

  public serverNames: string[] = [];
  public newName: string = "";
  public currentServerName: string = "";

  constructor(private chatService: ChatService) { }

  ngOnInit() {
    this.chatService.notifyServerChangement.subscribe((serverNames: string[]) => {
      this.serverNames = serverNames;
    });
    this.chatService.notifyChangementOfServer.subscribe((serverName) => {
      this.currentServerName = serverName;
    });
  }

  public onChangeServer(event: any) {
    if (event.value && event.value !== "") {
      this.chatService.onChangeChatServer(event.value);
    }
  }

  public onClickRemove() {
    this.chatService.onRemoveServer(this.currentServerName);
  }

  public async onClickAdd() {
    if (this.newName !== "") {
      await this.chatService.onAddServer(this.newName);
      this.newName = "";
    } 
  }

}
