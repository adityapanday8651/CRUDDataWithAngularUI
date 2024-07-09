import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @Output() toggleSidenav = new EventEmitter<void>();
  constructor(public authService: AuthService) {}

  onLogout() {
    this.authService.logoutAPICalls();
  }

  onToggleSidenav() {
    this.toggleSidenav.emit();
  }
}
