import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// used to create fake backend
import { fakeBackendProvider } from './_helpers';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { MyInMemoryService } from './_mockServices/my-in-memory.service';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { JwtInterceptor, ErrorInterceptor } from './_helpers';
import { FooterComponent } from './footer/footer.component'
;
import { HeaderComponent } from './header/header.component'
import { AuthenticationModule } from './authentication/authentication.module';;
import { AdvertsModule } from './adverts/adverts.module';;
import { HomeComponent } from './home/home.component';
import { AccountsModule } from './accounts/accounts.module';;


@NgModule({
    imports: [
        AppRoutingModule,
        BrowserModule,
        ReactiveFormsModule,
        AuthenticationModule,
        AdvertsModule,
        AccountsModule,
        HttpClientModule,
        HttpClientInMemoryWebApiModule.forRoot(MyInMemoryService),
    ],
    declarations: [
        AppComponent,
        FooterComponent,
        HeaderComponent,
        HomeComponent   
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

        // // provider used to create fake backend
        fakeBackendProvider
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }