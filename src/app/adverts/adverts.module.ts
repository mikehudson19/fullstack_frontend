import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MyAdvertsComponent } from "./myadverts";
import { TruncateTextPipe } from "../_helpers/truncate-text.pipe";
import { EditAdvertComponent } from "./edit-advert/edit-advert.component";
import { RouterModule } from "@angular/router";
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [MyAdvertsComponent, TruncateTextPipe, EditAdvertComponent],
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
})

export class AdvertsModule {}

