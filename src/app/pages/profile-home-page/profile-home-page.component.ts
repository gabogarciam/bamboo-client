import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-profile-home-page',
  templateUrl: './profile-home-page.component.html',
  styleUrls: ['./profile-home-page.component.css']
})
export class ProfileHomePageComponent implements OnInit {

  title = 'Home';

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  logout() {
    localStorage.clear();
    this.authService.logout()
      .then(() => this.router.navigate(['/login']));
  }

}
