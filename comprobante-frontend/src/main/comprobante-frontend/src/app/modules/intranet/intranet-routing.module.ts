import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MaestraComponent } from './components/config/maestra/maestra.component';

const intranetRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        redirectTo: 'maestras',
        pathMatch: 'full'
      }, {
        path: 'maestras',
        component: MaestraComponent,
        data: { title: 'Maestras' }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(intranetRoutes)],
  exports: [RouterModule]
})
export class IntranetRoutingModule { }
