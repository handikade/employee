import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

import { AuthService } from 'src/app/services/auth.service';
import { SpinnerService } from 'src/app/services/spinner.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [MessageService]
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private spinnerService: SpinnerService,
    private messageService: MessageService
  ) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    })
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.spinnerService.setIsLoading(true);
      this.authService.login({
        username: this.loginForm.controls.username.value,
        password: this.loginForm.controls.password.value
      }).subscribe(response => {
        localStorage.setItem('_token_', response.token);
        this.router.navigateByUrl('/employee');
      }, error => {
        this.spinnerService.setIsLoading(false);
        this.messageService.add({
          key: 'p-toast',
          severity: 'error',
          summary: 'Login Failed',
          detail: error.message
        });
      }, () => {
        this.spinnerService.setIsLoading(false);
      })
    }
  }
}
