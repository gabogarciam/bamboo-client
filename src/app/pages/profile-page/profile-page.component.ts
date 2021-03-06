import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
// import { ConsoleReporter } from 'jasmine';
import { UserService } from '../../services/user.service';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css'],
  animations: [
    trigger('changeState', [
      state('inactive', style({
        backgroundColor: '#eee',
        transform: 'scale(1)'
      })),
      state('active',   style({
        backgroundColor: '#cfd8dc',
        transform: 'scale(1.1)'
      })),
      transition('inactive => active', animate('100ms ease-in')),
      transition('active => inactive', animate('100ms ease-out'))
    ])
  ]
})
export class ProfilePageComponent implements OnInit {
  user: any;
  anon: boolean;
  publications: any;
  // counter: any;
  following: any;
  followed: any;
  tweets: any;
  url : string;
  image: string;

  constructor(private authService: AuthService, private userService: UserService) {  
    this.user = this.authService.getUser();
    this.url = this.userService.url;
   }

  ngOnInit() {
    
    this.userService.getMePublications()
    .then((data) => {
      this.publications = data;
    })
    .catch((error) => {
      console.log(error);
    })

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

    const phone = document.querySelector('.phone');
    const bar = document.querySelector('.bar');
    // const avatar = document.querySelector('.avatar');

    phone.addEventListener('scroll', (e) => {
      let offset = phone.scrollTop;

      if (offset > 133) {
        bar.classList.add('show-name');
      } else {
          bar.classList.remove('show-name');
      }

      if (offset > 71) {
        bar.classList.add('sticky');
      } else {
          bar.classList.remove('sticky');
      }
  
      offset = offset > 60 ? 60:offset;
      // const scale = 1 - offset / 60 * .44;
      // avatar.style.transform = `scale(${scale})`;
    }, { passive: true });
  }

  getAvatar() {
    this.userService.getAvatar()
      .then( image => {this.image = image});
  }

}
