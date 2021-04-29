import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable, Subscriber } from 'rxjs';
import employeeJson from './../shared/mocks/employees.json';

import { Employee } from './../shared/types/Employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  filterForStatus$: BehaviorSubject<string> = new BehaviorSubject<string>('');
  filterForGroup$: BehaviorSubject<string> = new BehaviorSubject<string>('');

  constructor(private http: HttpClient) { }

  getEmployees(): Observable<any> {
    return this.http.get('assets/employees.json');
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
