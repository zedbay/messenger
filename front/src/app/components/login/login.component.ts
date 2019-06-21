import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { WhoamiService } from 'src/app/services/whoami.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

	public userIsLogin: boolean = false;
	public whoami;

    constructor(private whoamiService: WhoamiService) { }

    async ngOnInit() {
        this.whoamiService.userIslogin.subscribe((bool) => {
            this.userIsLogin = bool;
            bool ? this.onConnection() : this.onDeconnection();
		});
		const whoami = await this.whoamiService.identity;
		this.whoami = whoami.data[0];
	}
	
    public onSignOut() {
        this.whoamiService.onSignOut();
    }

    public onSubmit(form: NgForm) {
        this.whoamiService.onLogin(form.value);
    }

    private onDeconnection() {

    }

    private onConnection() {

    }

}
