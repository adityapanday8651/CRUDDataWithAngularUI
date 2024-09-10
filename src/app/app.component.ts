import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';
import { NotificationService } from './services/notification.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'ProductCategory';
  isSidebarOpen: boolean = false;
  constructor(
    public authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {

  }

  onLogout() {
    this.authService.logoutAPICalls();
  }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  gotoHomePage() {
    const token = this.authService.getToken();
    if (token != '' && token !== undefined && token !== null) {
      this.router.navigate(['/home']);
    }
  }
}
