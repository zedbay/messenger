import { User } from "./user.model";

export class Message {

    public from: User;
    public content: string;
    public date: Date;
    public room: string;

    constructor(from: User, content: string, room: string) {
        this.from = from;
        this.content = content;
        this.room = room;
    }

    public static adminMessage(value: string, roomName: string) : Message {
        let user: User = new User('Système')
        return new Message(user, value, roomName);
    }

    public addMessageInBdd() {

    }

}