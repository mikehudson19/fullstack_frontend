import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { CustomValidators } from './_helpers/customValidators';

// used to create fake backend
import { fakeBackendProvider } from './_helpers';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { JwtInterceptor, ErrorInterceptor } from './_helpers';
import { MyAdvertsComponent } from './myadverts';
import { LoginComponent } from './login';
import { HomeComponent } from './home/home.component';
import { RegistrationComponent } from './registration/registration.component'
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { MyInMemoryService } from './_services/my-in-memory.service';

@NgModule({
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        HttpClientModule,
        // HttpClientInMemoryWebApiModule.forRoot(MyInMemoryService),
        AppRoutingModule
    ],
    declarations: [
        AppComponent,
        MyAdvertsComponent,
        LoginComponent
,
        HomeComponent ,
        RegistrationComponent   ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

        // // provider used to create fake backend
        fakeBackendProvider
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }