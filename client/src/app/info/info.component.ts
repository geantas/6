import {Component, OnInit, ViewChild} from '@angular/core';
import {updatedStock, deleteableStock, Stock, stockInfoModel} from '../stock';
import 'rxjs/operators';
import { StockService } from '../_services/stock.service';

@Component({
    moduleId: module.id,
    templateUrl: './shares.component.html',
    styleUrls: ['./shares.component.css'],
    providers: [StockService]
})
export class SharesComponent implements OnInit {
    isSubmitted = false;
    title = 'Stock info';
    errorHandler = "";
    // Get current date & time
    date = new Date();
    model = new Stock('', '', 'user', '', this.date, '', '', '');
    public stockList = [];
    public selectedStockObj = [];

    constructor(private stockService: StockService) {
    }

    showStockInfo(event, id, stockname) {

        var selectedStockId = id;
        var selectedStockName = stockname;
        var selectedStockObj = event.target;

        selectedStockObj = new stockInfoModel(selectedStockId, selectedStockName);

        this.stockService.stockInfo(selectedStockObj)
            .subscribe(
                selectedStock => {
                    selectedStockObj = selectedStock;
                },
                // Error handler
                error => this.errorHandler = <any>error
            );
    }

    ngOnInit() {
        //this.showStockInfo();
    }

}