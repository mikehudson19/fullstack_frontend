import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyAdvertsComponent } from './myadverts';
import { TruncateTextPipe } from '../_helpers/truncate-text.pipe';




@NgModule({
  declarations: [ MyAdvertsComponent, TruncateTextPipe ],
  imports: [
    CommonModule
  ]
})
export class AdvertsModule { }
