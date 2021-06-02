import { Component, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { AuthService } from '@services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  @ViewChild('drawer') drawer: MatDrawer | undefined;

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  goToEmployeePage(): void {
    this.drawer?.toggle();
    this.router.navigateByUrl('employee');
  }

  logout() {
    this.authService.logout();
  }
}
