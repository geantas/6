import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {HttpClient} from "@angular/common/http";

import { UserService } from '../_services/index';

import { AuthenticationService } from '../_services/index';

@Component({
    moduleId: module.id,
    templateUrl: 'login.component.html'
})

export class LoginComponent implements OnInit {
    model = { username: '', password: ''};
    //data: any;
/*    loading = false;
    returnUrl: string;*/

    constructor(
        //private route: ActivatedRoute,
       // private router: Router,
        //private http: HttpClient
        // private authenticationService: AuthenticationService
        //private alertService: AlertService
        ) { }

    ngOnInit() {
        // reset login status
        //this.authenticationService.logout();

        // get return url from route parameters or default to '/'
        //this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    login() {

/*        this.authenticationService.login(this.model.username, this.model.password)
            .subscribe(
                data => {
                    this.router.navigate([this.returnUrl]);
                },
                error => {
                    //this.alertService.error(error);
                    //this.loading = false;
                    console.log("error: " + error);
                });*/
    }
}
