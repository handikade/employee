import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subscriber } from 'rxjs';
import employeeJson from '@app/shared/mocks/employees.json';

import { Employee } from '@app/shared/types/Employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  filterForStatus$: BehaviorSubject<string> = new BehaviorSubject<string>('');
  filterForGroup$: BehaviorSubject<string> = new BehaviorSubject<string>('');

  constructor() { }

  getEmployees(): Observable<any> {
    return new Observable((subscriber: Subscriber<any>) => {
      const employees: Employee[] = employeeJson;

      subscriber.next({
        status: 200,
        employees: employees
      });
      subscriber.complete();
    });
  }

  getEmployeeByUsername(username: string): Observable<any> {
    return new Observable((subscriber: Subscriber<any>) => {
      const employees: Employee[] = employeeJson;
      const found: Employee | undefined = employees.find((employee: Employee) => employee.username === username);

      if (found) {
        subscriber.next({
          status: 200,
          employee: found
        });
        subscriber.complete();
      } else {
        subscriber.error({
          status: 404,
          message: 'Employee not found'
        });
      }
    });
  }
}
