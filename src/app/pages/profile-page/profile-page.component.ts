import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
// import { ConsoleReporter } from 'jasmine';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit {
  user: any;
  anon: boolean;
  publications: any;
  counter: any;

  constructor(private authService: AuthService, private userService: UserService) {  
    this.user = this.authService.getUser();
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
      this.counter = data;
    })
    .catch((error) => {
      console.log(error);
    })

    const phone = document.querySelector('.phone'),
          bar = document.querySelector('.bar'),
          avatar = document.querySelector('.avatar');

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
      const scale = 1 - offset / 60 * .44;
      // avatar.style.transform = `scale(${scale})`;
    }, { passive: true });
  }

}
