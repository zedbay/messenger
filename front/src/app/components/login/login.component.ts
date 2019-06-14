import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { WhoamiService } from 'src/app/services/whoami.service';
import { NetworkService } from 'src/app/services/network.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    public userIsLogin: boolean = false;

    constructor(private whoamiService: WhoamiService, private ns: NetworkService) { }

    ngOnInit() {
        this.whoamiService.userIslogin.subscribe((bool) => {
            this.userIsLogin = bool;
            bool ? this.onConnection() : this.onDeconnection();
        });
    }

    public async onSignOut() {
        this.whoamiService.onSignOut();
        // let tmp = await this.requestAsync();
        // console.log(tmp);
    }

    // public async seachForDetails() {
    //     let tmp = await this.requestAsync();
    //     // Ici les trois request sont réalisés et utilisable (et dans l'ordre choisi)
    //     console.log(tmp);
    // }

    // public async requestAsync() {
    //     // Première request
    //     let firstRequest = await this.ns.get('/server').toPromise();
    //     // Arrivée ici la request 1 est terminé
    //     console.log(" 1 - " , firstRequest);
    //     let secondRequest = await this.ns.get('/server/welcome').toPromise();
    //     console.log("2 - " , secondRequest);
    //     let thirdlyRequest = await this.ns.delete('/server/test').toPromise();
    //     console.log("3 - " , thirdlyRequest);
    //     return [firstRequest, secondRequest, thirdlyRequest];
    // }

    public onSubmit(form: NgForm) {
        this.whoamiService.onLogin(form.value);
    }

    private onDeconnection() {

    }

    private onConnection() {

    }

}
