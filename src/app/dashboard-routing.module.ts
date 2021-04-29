import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CanActivateDashboardGuard } from '@app/guards/can-activate-dashboard.guard';

import { DashboardComponent } from '@app/shared/components/dashboard/dashboard.component';
import { EmployeeIndexComponent } from '@app/pages/employee/employee-index/employee-index.component';
import { EmployeeCreateComponent } from '@app/pages/employee/employee-create/employee-create.component';
import { EmployeeDetailComponent } from '@app/pages/employee/employee-detail/employee-detail.component';


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
