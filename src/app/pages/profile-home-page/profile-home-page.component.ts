import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-profile-home-page',
  templateUrl: './profile-home-page.component.html',
  styleUrls: ['./profile-home-page.component.css']
})
export class ProfileHomePageComponent implements OnInit {

  title = 'Home';
  // counter: any;
  following: any;
  followed: any;
  tweets: any;
  url : string;
  image: string;
  user: any;
  publications: any;

  constructor(private authService: AuthService, private userService: UserService, private router: Router) {
    this.url = this.userService.url;
    this.user = this.authService.getUser();
   }

  ngOnInit() {
    this.userService.getCounter()
    .then((data) => {
      localStorage.setItem('counters', JSON.stringify(data));
      // this.counter = data;
      this.following = data.following;
      this.followed = data.followed;
      this.tweets = data.publications;
      console.log(data);
    })
    .catch((error) => {
      console.log(error);
    })

    this.userService.getMePublications()
    .then((data) => {
      this.publications = data;
    })
    .catch((error) => {
      console.log(error);
    })
  }

  getAvatar() {
    this.userService.getAvatar()
      .then( image => {this.image = image});
  }

  logout() {
    localStorage.clear();
    this.authService.logout()
      .then(() => this.router.navigate(['/login']));
  }

}
