import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { notRetainAuthGuard } from './helpers/guards/not-retain-auth.guard';
import { authGuardGuard } from './helpers/guards/auth-guard.guard';

const routes: Routes = [
  {
    path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),canActivate : [notRetainAuthGuard]
  },
  {
    path: 'admin', loadChildren: () => import('./core/core.module').then(m => m.CoreModule),canActivate :[authGuardGuard]
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
