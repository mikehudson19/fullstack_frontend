import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MyAdvertsComponent } from "./myadverts";
import { TruncateTextPipe } from "../_helpers/truncate-text.pipe";
import { EditAdvertComponent } from "./edit-advert/edit-advert.component";
import { RouterModule } from "@angular/router";
import { ReactiveFormsModule } from "@angular/forms";
import { AllAdvertsComponent } from './all-adverts/all-adverts.component';
import { AdvertDetailComponent } from './advert-detail/advert-detail.component';

@NgModule({
  declarations: [MyAdvertsComponent, TruncateTextPipe, EditAdvertComponent, AllAdvertsComponent, AdvertDetailComponent],
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
})

export class AdvertsModule {}

