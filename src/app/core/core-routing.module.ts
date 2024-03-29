import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoreComponent } from './components/core/core.component';

const routes: Routes = [
  {
    path: "", component: CoreComponent, children: [
      {
        path: "plat", loadChildren: () => import('./plat/plat.module').then(m => m.PlatModule)
      },
      {
        path: "menu", loadChildren: () => import('./menu/menu.module').then(m => m.MenuModule)
      },
      {
        path: "reservation",loadChildren:() => import('./reservation/reservation.module').then(m => m.ReservationModule)
      },
      {
        path: "type",loadChildren:() => import('./type/type.module').then(m => m.TypeModule)
      },
      {
        path: "**", redirectTo: ""
      }
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [
    RouterModule]
})
export class CoreRoutingModule { }
