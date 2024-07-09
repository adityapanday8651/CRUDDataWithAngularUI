import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {

  navLinks = [
    { label: 'Home', link: '/home' },
    { label: 'Product', link: '/product' },
    { label: 'Category', link: '/category' },
    { label: 'Profile', link: '/profile' },
    { label: 'Main-Content', link: '/main-content' }
  ];
}
