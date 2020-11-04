import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyAdvertsComponent } from './adverts/myadverts/myadverts.component';
import { LoginComponent } from './authentication/login/login.component';
import { NotAuthGuard } from './_helpers';
import { HomeComponent } from './home/home.component';
import { RegistrationComponent } from './authentication/registration/registration.component';
import { AuthGuard } from './authentication/auth.guard';
import { EditAdvertComponent } from './adverts/edit-advert/edit-advert.component';

const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'login', component: LoginComponent, canActivate: [AuthGuard] },
    { path: 'home',  component: HomeComponent },
    { path: 'registration', component: RegistrationComponent, canActivate: [AuthGuard] },
    { path: 'sell', component: HomeComponent, canActivate: [NotAuthGuard] },
    { path: 'myadverts', component: MyAdvertsComponent, canActivate: [NotAuthGuard] },
    { path: 'editadvert/:id', component: EditAdvertComponent, canActivate: [NotAuthGuard] },

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }


