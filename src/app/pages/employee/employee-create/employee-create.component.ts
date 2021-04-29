import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-employee-create',
  templateUrl: './employee-create.component.html',
  styleUrls: ['./employee-create.component.scss'],
  providers: [MessageService]
})
export class EmployeeCreateComponent implements OnInit {
  employeeForm: FormGroup;
  maxBirthDate: Date;
  statusList: any[] = [
    {
      label: 'Single',
      value: 'single'
    },
    {
      label: 'Married',
      value: 'married'
    }
  ];
  groups: string[] = [
    'engineering',
    'finance',
    'marketing',
    'sdm',
    'sales',
    'cs',
    'public-relation',
    'logistic',
    'analyst',
    'support'
  ];
  filteredGroups: Observable<string[]>;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private messageService: MessageService
  ) {
    this.employeeForm = this.fb.group({
      username: ['', [Validators.required]],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      birthDate: ['', [Validators.required]],
      basicSalary: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      status: ['', [Validators.required]],
      group: ['', [Validators.required]],
      description: ['', [Validators.required]]
    });

    this.maxBirthDate = new Date();

    this.filteredGroups = this.employeeForm.controls.group.valueChanges.pipe(
      startWith(''),
      map(value => this.filter(value))
    );
  }

  ngOnInit(): void { }

  private filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.groups.filter(group => group.toLowerCase().indexOf(filterValue) === 0);
  }

  onSubmit(): void {
    if (this.employeeForm.valid) {
      this.messageService.add({
        key: 'bc',
        severity: 'success',
        summary: 'Create Success',
        detail: `Employee ${this.employeeForm.controls.username.value} has been created.`
      });
    }
  }

  goToEmployeePage(): void {
    this.router.navigateByUrl('employee');
  }
}
