import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlatRoutingModule } from './plat-routing.module';
import { PlatComponent } from './components/plat/plat.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    PlatComponent
  ],
  imports: [
    CommonModule,
    PlatRoutingModule,
    SharedModule,
  ]
})
export class PlatModule { }
