import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'SocialPíO';
  loading = true;
  anon: boolean;
  user: any;
  url : string;
  image: string;

  constructor(private authService: AuthService, private userService: UserService, private router: Router) {
    this.url = this.userService.url;
  }

  ngOnInit() {
    this.authService.userChange$.subscribe((user) => {
      this.loading = false;
      this.user = user;
      this.anon = !user;
      // console.log(this.user);
    });
  }

  logout() {
    localStorage.clear();
    this.authService.logout()
      .then(() => this.router.navigate(['/login']));
  }
}
