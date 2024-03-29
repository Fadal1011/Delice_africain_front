import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { ButtonComponent } from './components/button/button.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { LoaderComponent } from './components/loader/loader.component';
import { PaginationComponent } from './components/pagination/pagination.component';


@NgModule({
  declarations: [
    ButtonComponent,
    LoaderComponent,
    PaginationComponent
  ],
  imports: [
    CommonModule,
    SharedRoutingModule
  ],
  exports:[
    HttpClientModule,
    ReactiveFormsModule,
    ButtonComponent,
    LoaderComponent,
    PaginationComponent
  ]
})
export class SharedModule { }
