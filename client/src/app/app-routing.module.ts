import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
//import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
//import { HomeComponent } from './home/index';
import { LoginComponent } from './login/index';
import { SharesComponent } from './shares/index';
//import { RegisterComponent } from './register/index';
//import { AuthGuard } from './_guards/index';


const routes: Routes = [
    { path: '', component: SharesComponent },
    { path: 'login', component: LoginComponent },
    { path: 'shares', component: SharesComponent },

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)], // NgbModule],
    exports: [RouterModule],
    providers: []
})
export class MEAN2RoutingModule {
}

const appRoutes: Routes = [
    { path: '', component: SharesComponent },
    { path: 'login', component: LoginComponent },
    { path: 'shares', component: SharesComponent },

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);