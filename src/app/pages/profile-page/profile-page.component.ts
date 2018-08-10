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
  }

}
