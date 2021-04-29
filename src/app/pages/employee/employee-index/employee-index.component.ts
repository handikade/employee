import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

import { EmployeeService } from '@app/services/employee.service';

import { Employee } from '@app/shared/types/Employee';

@Component({
  selector: 'app-employee-index',
  templateUrl: './employee-index.component.html',
  styleUrls: ['./employee-index.component.scss'],
  providers: [MessageService]
})
export class EmployeeIndexComponent implements OnInit {
  employees: any[] = [];

  constructor(
    private employeeService: EmployeeService,
    private messageService: MessageService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.employeeService.getEmployees().subscribe(response => {
      console.log("#debug response:", response);
      this.employees = response;
    });
  }

  editEmployee(employee: Employee): void {
    this.messageService.add({
      key: 'bc',
      severity: 'warn',
      summary: 'Edit Success',
      detail: `Employee ${employee.username} has been edited.`
    });
  }

  deleteEmployee(employee: Employee): void {
    this.messageService.add({
      key: 'bc',
      severity: 'error',
      summary: 'Delete Success',
      detail: `Employee ${employee.username} has been deleted.`
    });
  }

  viewEmployee(employee: Employee): void {
    this.router.navigate(['employee', employee.username]);
  }

  createEmployee(): void {
    this.router.navigateByUrl('employee/add');
  }
}
