import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit {
  user: any;
  anon: boolean;

  constructor(private authService: AuthService) {  
    this.user = this.authService.getUser();
   }

  ngOnInit() {
  }

}
