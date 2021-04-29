import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CanActivateDashboardGuard } from './guards/can-activate-dashboard.guard';

import { DashboardComponent } from './shared/components/dashboard/dashboard.component';
import { EmployeeIndexComponent } from './pages/employee/employee-index/employee-index.component';
import { EmployeeCreateComponent } from './pages/employee/employee-create/employee-create.component';
import { EmployeeDetailComponent } from './pages/employee/employee-detail/employee-detail.component';


const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    canActivate: [CanActivateDashboardGuard],
    children: [
      {
        path: 'employee',
        component: EmployeeIndexComponent,
        canActivate: [CanActivateDashboardGuard]
      },
      {
        path: 'employee/add',
        component: EmployeeCreateComponent,
        canActivate: [CanActivateDashboardGuard]
      },
      {
        path: 'employee/detail/:username',
        component: EmployeeDetailComponent,
        canActivate: [CanActivateDashboardGuard]
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'employee',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
