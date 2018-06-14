import {Component, OnInit, ViewChild} from '@angular/core';
import {deleteableStock, Stock} from './stock';
import {updatedStock} from './stock';
import './rxjs-operators';
import {StockService} from './_services/stock.service';

@Component({
    moduleId: module.id,
    selector: 'app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    //providers: [StockService]
})
export class AppComponent { }