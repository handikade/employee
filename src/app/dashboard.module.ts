import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { DashboardRoutingModule } from '@app/dashboard-routing.module';
import { CanActivateDashboardGuard } from '@app/guards/can-activate-dashboard.guard';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';

import { DashboardComponent } from '@app/shared/components/dashboard/dashboard.component';
import { EmployeeIndexComponent } from '@app/pages/employee/employee-index/employee-index.component';
import { EmployeeCreateComponent } from '@app/pages/employee/employee-create/employee-create.component';
import { EmployeeDetailComponent } from '@app/pages/employee/employee-detail/employee-detail.component';
import { CardComponent } from '@app/shared/components/card/card.component';

@NgModule({
  declarations: [
    DashboardComponent,
    EmployeeIndexComponent,
    EmployeeCreateComponent,
    EmployeeDetailComponent,
    CardComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    ReactiveFormsModule,

    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatTooltipModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatAutocompleteModule,

    TableModule,
    ButtonModule,
    ToastModule
  ],
  providers: [CanActivateDashboardGuard]
})
export class DashboardModule { }
