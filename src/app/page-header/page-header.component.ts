import { Component } from '@angular/core';
import { pbIsLoggedIn, pbLogOut } from '../pocketbaseService';
import { Router } from '@angular/router';

@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.css'],
})
export class PageHeaderComponent {
  constructor(private router: Router) {}

  onSignOut() {
    if (pbIsLoggedIn()) {
      pbLogOut();
      window.alert('Signed Out');
      this.router.navigate(['/login']);
      return;
    }
    window.alert('Not Signed in');
  }
}
