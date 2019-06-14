export class User {

    public name: string = "";
    public token: string;

    constructor(name: string, token: string = "") {
        this.name = name;
        this.token = token;
    }
}

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

    public addMessageInBdd() {

    }

}
