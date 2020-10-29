import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyAdvertsComponent } from './myadverts';
import { LoginComponent } from './login';
import { AuthGuard } from './_helpers';
import { HomeComponent } from './home/home.component';
import { RegistrationComponent } from './registration/registration.component';

const routes: Routes = [
    { path: '', component: MyAdvertsComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'home',  component: HomeComponent },
    { path: 'registration', component: RegistrationComponent },

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
