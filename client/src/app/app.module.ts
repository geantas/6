import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {routing} from './app-routing.module';
import {RouterModule, Routes} from '@angular/router';
import {AppComponent} from './app.component';
import {LoginComponent} from "./login";
import {SharesComponent} from "./shares";
import { StockService } from './_services/index';


//import { UserService } from './_services/index';



@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        SharesComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        RouterModule,
        routing
    ],
    providers: [
        StockService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
