import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ProductCategory';
  constructor(public authService: AuthService) {}

  onLogout() {
    this.authService.logoutAPICalls();
  }
}
