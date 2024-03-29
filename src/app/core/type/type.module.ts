import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TypeRoutingModule } from './type-routing.module';
import { TypeComponent } from './components/type/type.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    TypeComponent
  ],
  imports: [
    CommonModule,
    TypeRoutingModule,
    SharedModule,
  ]
})
export class TypeModule { }
