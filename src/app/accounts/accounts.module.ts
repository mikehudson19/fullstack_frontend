import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyAccountComponent } from './my-account/my-account.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SellerAccountComponent } from './seller-account/seller-account.component';



@NgModule({
  declarations: [ MyAccountComponent, SellerAccountComponent ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ]
})

export class AccountsModule { }
