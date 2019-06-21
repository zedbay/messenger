export class User {

    public name: string = "";
    public token: string = "";

    constructor(name: string, token: string = "") {
        this.name = name;
        this.token = token;
    }
}