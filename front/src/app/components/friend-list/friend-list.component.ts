import { Component, OnInit } from '@angular/core';
import { WhoamiService } from '../../services/whoami.service';
import { ChatService } from 'src/app/services/chat.service';

@Component({
	selector: 'app-friend-list',
	templateUrl: './friend-list.component.html',
	styleUrls: ['./friend-list.component.scss']
})
export class FriendListComponent implements OnInit {

	public friends: any[] = [];
	public selectedFriend;

	constructor(
		private whoamiService: WhoamiService,
		private chatService: ChatService) { }

	ngOnInit() {
		this.getFriendsList();
	}

	private async getFriendsList() {
		let friends = await this.whoamiService.getFriends();
		this.friends = friends.data;
		this.selectedFriend = this.friends[0];
	}

	public async onSelectFriend(friend: any) {
		this.selectedFriend = friend;
		this.chatService.onChangeChatServer(friend.identity.low);
	}

}
