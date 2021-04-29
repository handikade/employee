import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from '@app/shared/components/dashboard/dashboard.component';
import { EmployeeIndexComponent } from '@app/pages/employee/employee-index/employee-index.component';
import { EmployeeCreateComponent } from '@app/pages/employee/employee-create/employee-create.component';
import { EmployeeDetailComponent } from '@app/pages/employee/employee-detail/employee-detail.component';

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
      },
      {
        path: 'employee/detail/:username',
        component: EmployeeDetailComponent,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
