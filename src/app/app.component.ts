import { Component } from '@angular/core';
import { SpinnerService } from '@services/spinner.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isLoading: boolean = false;

  constructor(private spinnerService: SpinnerService) {
    this.spinnerService.isLoading$.subscribe((isLoading: boolean) => {
      this.isLoading = isLoading;
    })
  }
}
