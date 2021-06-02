import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '@services/employee.service';
import { Employee } from '@app/shared/types/Employee';

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.scss']
})
export class EmployeeDetailComponent implements OnInit {
  employee: Employee | undefined;
  isLoading: boolean | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private employeeService: EmployeeService
  ) { }

  ngOnInit(): void {
    const employeeUsername: string = this.route.snapshot.params.username;

    this.employeeService.getEmployeeByUsername(employeeUsername).subscribe(response => {
      this.employee = response.employee;
    });
  }

  goToEmployeePage(): void {
    this.router.navigateByUrl('employee');
  }
}
