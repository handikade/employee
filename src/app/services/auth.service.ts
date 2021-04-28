import { Injectable } from '@angular/core';
import { Observable, of, Subscriber } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly USERNAME: string = "admin";
  private readonly PASSWORD: string = "123456";

  constructor() { }

  login(payload: LoginPayload): Observable<any> {
    const successResponse: LoginSuccessResponse = {
      status: 200,
      token: "NrgQz7D5mjJGlBsvuCxo"
    }

    const errorResponse: LoginErrorResponse = {
      status: 403,
      message: "Username atau Password salah"
    }

    return new Observable((subscriber: Subscriber<any>) => {
      setTimeout(() => { // mocking API delay
        if (payload.username === this.USERNAME && payload.password == this.PASSWORD) {
          subscriber.next(successResponse);
          subscriber.complete();
        } else {
          subscriber.error(errorResponse);
        }
      }, 1000);
    });
  }
}

export interface LoginPayload {
  username: string;
  password: string;
}

export interface LoginResponse {
  status: number;
}

export interface LoginSuccessResponse extends LoginResponse {
  token: string;
}

export interface LoginErrorResponse extends LoginResponse {
  message: string;
}