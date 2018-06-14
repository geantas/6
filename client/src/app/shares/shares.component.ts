import {Component, OnInit, ViewChild} from '@angular/core';
import {updatedStock, deleteableStock, Stock} from '../stock';
import 'rxjs/operators';
import {StockService} from '../stock.service';

@Component({
    selector: 'shares-app',
    moduleId: module.id,
    templateUrl: './shares.component.html',
    styleUrls: ['./shares.component.css'],
    providers: [StockService]
})
export class SharesComponent implements OnInit {
    isSubmitted = false;
    title = 'Shares';
    errorHandler = "";
    // Get current date & time
    date = new Date();
    model = new Stock('', '', 'user', '', this.date, '', '', '');
    public stockList = [];

    constructor(private stockService: StockService) {
    }

    submitStock() {
        this.stockService.addStock(this.model)
            .subscribe(
                stockItem => {
                    this.model = stockItem;
                    // this.getStocks();
                },
                // Error handler
                error => this.errorHandler = <any>error
            );
    }

    getStocks() {
        //console.log('Subscribe to service');
        this.stockService.getStocks()
            .subscribe(
                list => {
                    this.stockList = list;
                },
                // Error handler
                error => this.errorHandler = <any>error
            );
    }

    updateAStock(event, id, stockname) {
        var editableStockId = id;
        var editableStockName = stockname;
        var updatedPrice = event.target.outerText;

        //console.log("New price " + updatedPrice + " saved");

        updatedPrice = new updatedStock(editableStockId, editableStockName, updatedPrice, 'gintasNOW', this.date);

        this.stockService.updateStock(updatedPrice)
            .subscribe(
                stockValue => {
                    updatedPrice = stockValue;
                },
                // Error handler
                error => this.errorHandler = <any>error
            );
    }


    deleteAStock(event, id, stockname) {
        var deleteableStockId = id;
        var deleteableStockName = stockname;
        var deleteableStockObj = event.target;

        deleteableStockObj = new deleteableStock(deleteableStockId, deleteableStockName);


        this.stockService.deleteStock(deleteableStockObj)
            .subscribe(
                selectedStock => {
                    deleteableStockObj = selectedStock;
                },
                // Error handler
                error => this.errorHandler = <any>error
            );
    }

    ngOnInit() {
        this.getStocks();
    }

    // Allow only numbers into the input field
    onlyNumberKey(event) {
        return (event.charCode == 8 || event.charCode == 0) ? null : event.charCode >= 48 && event.charCode <= 57;
    }

    // Receive the updated data from input field
    onRowClick(event, id) {
        var editableStockName = id;
        var updatedPrice = event.target.outerText;
        //console.log("Stock id: " + editableStockName + " | New price: " + updatedPrice);
    }
}