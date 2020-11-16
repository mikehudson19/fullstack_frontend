import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyAdvertsComponent } from './adverts/myadverts/myadverts.component';
import { LoginComponent } from './authentication/login/login.component';
import { NotAuthGuard } from './_helpers';
import { AllAdvertsComponent } from './adverts/all-adverts/all-adverts.component';
import { RegistrationComponent } from './authentication/registration/registration.component';
import { AuthGuard } from './authentication/auth.guard';
import { EditAdvertComponent } from './adverts/edit-advert/edit-advert.component';
import { UnsavedGuard } from './adverts/unsaved.guard';
import { HomeComponent } from './home/home.component';
import { AdvertDetailComponent } from './adverts/advert-detail/advert-detail.component';

const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'login', component: LoginComponent, canActivate: [AuthGuard] },
    { path: 'home',  component: HomeComponent },
    { path: 'registration', component: RegistrationComponent, canActivate: [AuthGuard] },
    { path: 'myadverts', component: MyAdvertsComponent, canActivate: [NotAuthGuard] },
    { path: 'editadvert/:id', component: EditAdvertComponent, canActivate: [NotAuthGuard], canDeactivate: [UnsavedGuard] },
    { path: 'alladverts', component: AllAdvertsComponent },
    { path: 'advertdetail/:id', component: AdvertDetailComponent },

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }


