import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { Stock } from '../stock';
import { StockService } from '../_services/stock.service';
import { map } from 'rxjs/operators';

@Component({
    selector: 'app-info',
    templateUrl: './info.component.html'
    //styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit {
    stocks: any = [];
    //stocks: any = {};
    angForm: FormGroup;

    constructor(private route: ActivatedRoute,
                private router: Router,
                private stockService: StockService,
                ) { }

    ngOnInit() {


        this.route.params.subscribe(params => {
            this.stockService.stockInfo(params['id']).subscribe(res => {
                this.stocks = res;
                console.log("xxxxxx");
                console.log("data here: " + JSON.stringify(this.stocks));
            });
        });

    }

    hasToken(){
        return localStorage.getItem("jwtToken");
    }
}
