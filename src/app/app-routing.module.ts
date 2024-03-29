import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'admin', loadChildren: () => import('./core/core.module').then(m => m.CoreModule),
  },
  {
    path: '', loadChildren: () => import('./client/client.module').then(m => m.ClientModule),
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
