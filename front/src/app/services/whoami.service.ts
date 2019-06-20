import { Injectable, EventEmitter } from '@angular/core';
import { NetworkService } from './network.service';
import * as JWT from 'jwt-decode';

@Injectable({
    providedIn: 'root'
})
export class WhoamiService {

    public currentStatus: boolean = false;
    public userIslogin: EventEmitter<boolean> = new EventEmitter<boolean>();

    constructor(private networkService: NetworkService) {
        if (localStorage.getItem('token')) {
            this.networkService.get('/tokenIsOk').subscribe((res) => {
                this.currentStatus = res['isOk'];
                this.userIslogin.emit(this.currentStatus);
                if (!res['isOk']) {
                    localStorage.removeItem('token');
                }
            });
        }
    }

    public onLogin(credentials: any) {
        this.networkService.post('/login', credentials).subscribe((res) => {
            localStorage.setItem('token', res['token']);
            this.userIslogin.emit(true);
        });
    }

    public onSignOut() {
        localStorage.removeItem('token');
        this.userIslogin.emit(false);
    }

    get claims(): Map<string, any> {
        const token = localStorage.getItem('token');
        const tokenDecode = JWT(token);
        let identity = new Map();
        identity.set('id', tokenDecode['id']['low']);
        identity.set('type', tokenDecode['type']);
        identity.set('name', tokenDecode['name']);
        identity.set('firstName', tokenDecode['firstName']);
        return identity;
    }

}
