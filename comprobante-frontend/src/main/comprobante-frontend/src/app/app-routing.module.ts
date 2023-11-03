import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const rootRoutes: Routes = [
  {
    path: '',
    redirectTo: 'intranet',
    pathMatch: 'full'
  },
  {
    path: 'intranet',
    loadChildren: () => import('./modules/intranet/intranet.module').then(m => m.IntranetModule),
  },
  {
    path: '**',
    redirectTo: 'sesion/404'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(rootRoutes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
