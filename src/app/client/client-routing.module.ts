import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientComponent } from './components/client/client.component';

const routes: Routes = [
  {
    path: "", component: ClientComponent, children: [
      {
        path: "home", loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
      },
      {
        path: "menu", loadChildren: () => import('./menu/menu.module').then(m => m.MenuModule)
      },
      {
        path: "reservation",loadChildren:() => import('./reservation/reservation.module').then(m => m.ReservationModule)
      },
      // {
      //   path: "type",loadChildren:() => import('./type/type.module').then(m => m.TypeModule)
      // },
      // {
      //   path: "**", redirectTo: ""
      // }
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule { }
