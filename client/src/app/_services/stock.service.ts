import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {Stock} from '../stock';
import {Observable} from 'rxjs/Observable';
import * as io from 'socket.io-client';

@Injectable()
export class StockService {
    private getStocksUrl = 'stock/get';  // URL to web API
    private postStockUrl = 'stock/post';  // URL to web API
    private deleteStockUrl = 'stock/delete';  // URL to web API
    private stockInfoUrl = 'stock/info';  // URL to web API
    constructor(private http: Http) {
    }

    private socket;
    private url = window.location.origin;

    // Get stocks list from server //
    getStocks(): Observable<Stock[]> {
        let observable = new Observable(observer => {
            console.log("Socket:", this.url);
            this.socket = io(this.url);
            this.socket.on('refresh', (data) => {
                observer.next(data);
            });

            return () => {
                this.socket.disconnect();
            };
        });
        return observable;
    }
    // Get stock info
    stockInfo(): Observable<Stock> {
        let observable = new Observable(observer => {
            console.log("Socket:", this.stockInfoUrl);
            this.socket = io(this.stockInfoUrl);
            this.socket.on('refresh', (data) => {
                observer.next(data);
            });
            return () => {
                this.socket.disconnect();
            };
        });
        return observable;
    }

    // Send stock to server //
    addStock(stock: Stock): Observable<Stock> {
        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: headers});

        return this.http.post(this.postStockUrl, stock, options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    // Send stock update to server //
    updateStock(stock: Stock): Observable<Stock> {
        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: headers});

        //console.log(this.url + "/stock/update");

        return this.http.post(this.url + "/stock/update", stock, options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    // Send stock delete request to server //
    deleteStock(stock: Stock): Observable<Stock> {
        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: headers});

        return this.http.post(this.deleteStockUrl, stock, options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    // Data handlers //
    private extractData(res: Response) {
        let body = res.json();
        //console.log(body);
        return body || {};
    }
    private handleError(error: Response | any) {
        // In a real world app, we might use a remote logging infrastructure
        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        //console.log(errMsg);
        return Observable.throw(errMsg);
    }
}
