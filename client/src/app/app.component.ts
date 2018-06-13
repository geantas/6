import { Component, OnInit, ViewChild } from '@angular/core';
import { Stock } from './stock';
import { updatedStock } from './stock';
import './rxjs-operators';
import { StockService } from './stock.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [StockService],
})
export class AppComponent implements OnInit {
  isSubmitted = false;
  title = 'MEAN app with Socket IO';
  // get current date & time
  date = new Date();
  model = new Stock( '', '', 'user', null, this.date);
  public stockList = [];

  constructor (private stockService: StockService) {}

  submitStock() {
    this.stockService.addStock(this.model)
      .subscribe(
        stockMsg => {
          this.model = stockMsg;
          // this.getStocks();
        },
        error =>  this.title = <any>error
      );
  }

  getStocks() {
    //console.log('Subscribe to service');
    this.stockService.getStocks()
      .subscribe(
        list => {
          this.stockList = list;
        },
        error =>  this.title = <any>error
      );
  }

  updateAStock(event, id) {

      //var editableStockName = id;
      var updatedPrice = event.target.outerText;
      console.log("New price " + updatedPrice + " saved");

      updatedPrice = new updatedStock( id , '', 'user', updatedPrice, this.date);


      this.stockService.updateStock(updatedPrice)
          .subscribe(
              stockValue => {
                  updatedPrice = stockValue;
                  // this.getStocks();
                  //console.log("received: " + stockValue);
              },
              error =>  this.title = <any>error
          );
  }

  ngOnInit() {
    this.getStocks();
  }

    onlyNumberKey(event) {
        return (event.charCode == 8 || event.charCode == 0) ? null : event.charCode >= 48 && event.charCode <= 57;
    }

    onRowClick(event, id){
    var editableStockName = id;
    var updatedPrice = event.target.outerText;
        console.log("Stock id: " + editableStockName + " | New price: " + updatedPrice);
    }

/*    updateValue(event, id) {
        var editableStockName = id;
        var updatedPrice = event.target.outerText;
            console.log("New price " + updatedPrice + " saved");
        }*/

    }