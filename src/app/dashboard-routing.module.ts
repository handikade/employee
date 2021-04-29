import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from '@app/shared/components/dashboard/dashboard.component';
import { EmployeeIndexComponent } from './pages/employee/employee-index/employee-index.component';
import { EmployeeCreateComponent } from './pages/employee/employee-create/employee-create.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: 'employee',
        component: EmployeeIndexComponent,
      },
      {
        path: 'employee/add',
        component: EmployeeCreateComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
