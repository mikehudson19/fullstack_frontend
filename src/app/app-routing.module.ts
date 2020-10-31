import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyAdvertsComponent } from './myadverts';
import { LoginComponent } from './login';
import { NotAuthGuard } from './_helpers';
import { HomeComponent } from './home/home.component';
import { RegistrationComponent } from './registration/registration.component';
import { AuthGuard } from './_helpers/auth.guard';

const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'login', component: LoginComponent, canActivate: [AuthGuard] },
    { path: 'home',  component: HomeComponent },
    { path: 'registration', component: RegistrationComponent, canActivate: [AuthGuard] },
    { path: 'sell', component: HomeComponent, canActivate: [NotAuthGuard] },
    { path: 'myadverts', component: MyAdvertsComponent, canActivate: [NotAuthGuard] },

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
