import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { FormControl } from '@angular/forms';

import { EmployeeService } from '@app/services/employee.service';

import { Employee } from '@app/shared/types/Employee';
import { Table } from 'primeng/table';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-employee-index',
  templateUrl: './employee-index.component.html',
  styleUrls: ['./employee-index.component.scss'],
  providers: [MessageService]
})
export class EmployeeIndexComponent implements OnInit, OnDestroy, AfterViewInit {
  employees: any[] = [];

  statusFormControl = new FormControl('');
  filterForStatus: string = '';
  statuses: any[] = [
    { label: 'Single', value: 'single' },
    { label: 'Married', value: 'married' },
  ];

  groupFormControl = new FormControl('');
  filterForGroup: string = '';
  groups: any[] = [
    { label: 'Engineering', value: 'engineering' },
    { label: 'Finance', value: 'finance' },
    { label: 'Marketing', value: 'marketing' },
    { label: 'SDM', value: 'sdm' },
    { label: 'Sales', value: 'sales' },
    { label: 'CS', value: 'cs' },
    { label: 'Public Relation', value: 'public-relation' },
    { label: 'Logistic', value: 'logistic' },
    { label: 'Analyst', value: 'analyst' },
    { label: 'Support', value: 'support' }
  ];

  @ViewChild('dt') dt: Table | undefined;

  unsubscribe$: Subject<any> = new Subject<any>();

  constructor(
    private employeeService: EmployeeService,
    private messageService: MessageService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.employeeService.getEmployees().subscribe(response => {
      this.employees = response;
    });
  }

  ngAfterViewInit(): void {
    this.employeeService.filterForStatus$.pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe((filterForStatus: string) => {
      if (filterForStatus) {
        setTimeout(() => {
          this.statusFormControl.setValue(filterForStatus);
        }, 0);
        this.dt?.filter(filterForStatus, 'status', 'equals')
      }
    });

    this.employeeService.filterForGroup$.pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe((filterForGroup: string) => {
      if (filterForGroup) {
        setTimeout(() => {
          this.groupFormControl.setValue(filterForGroup);
        }, 0);
        this.dt?.filter(filterForGroup, 'group', 'equals')
      }
    });
  }

  editEmployee(employee: Employee): void {
    this.messageService.add({
      key: 'p-toast',
      severity: 'warn',
      summary: 'Edit Success',
      detail: `Employee ${employee.username} has been edited.`
    });
  }

  deleteEmployee(employee: Employee): void {
    this.messageService.add({
      key: 'p-toast',
      severity: 'error',
      summary: 'Delete Success',
      detail: `Employee ${employee.username} has been deleted.`
    });
  }

  viewEmployee(employee: Employee): void {
    this.router.navigate(['employee/detail/', employee.username]);
  }

  createEmployee(): void {
    this.router.navigateByUrl('employee/add');
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
    this.employeeService.filterForStatus$.next(this.statusFormControl.value);
    this.employeeService.filterForGroup$.next(this.groupFormControl.value);
  }
}
