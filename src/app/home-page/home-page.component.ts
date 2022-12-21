import { Component } from '@angular/core';
import { pbGetCurrentUser, pbLogOut, pbIsLoggedIn } from '../pocketbaseService';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent {
  constructor(private router: Router) {}

  onSignOut() {
    if (pbIsLoggedIn()) {
      pbLogOut();
      window.alert('Signed Out');
      this.router.navigate(['/login'])
      return;
    }
    window.alert('Not Signed in');
  }

  onTestClick() {
    if (pbIsLoggedIn()) {
      window.alert(`Your user id: ${pbGetCurrentUser()?.id}`);
    }
  }
}
