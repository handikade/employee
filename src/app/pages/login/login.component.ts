import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { SpinnerService } from 'src/app/services/spinner.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private router: Router,
    private authService: AuthService,
    private spinnerService: SpinnerService
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
        this.router.navigateByUrl('/');
      }, error => {
        this.spinnerService.setIsLoading(false);
        this.snackBar.open(error.message, 'Mengerti');
      }, () => {
        this.spinnerService.setIsLoading(false);
      })
    }
  }
}
