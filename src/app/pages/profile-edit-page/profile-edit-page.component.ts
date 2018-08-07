import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '../../../../node_modules/@angular/router';

@Component({
  selector: 'app-profile-edit-page',
  templateUrl: './profile-edit-page.component.html',
  styleUrls: ['./profile-edit-page.component.css']
})
export class ProfileEditPageComponent implements OnInit {

  loading = true;
  anon: boolean;
  user: any;
  feedbackEnabled = false;
  error = null;
  processing = false;
  username : string = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.user = this.authService.getUser();
    this.authService.userChange$.subscribe((user) => {
      this.loading = false;
      this.user = user;
      this.anon = !user;
    });
  }

  submitForm(form) {
    this.error = '';
    this.feedbackEnabled = true;
    if (form.valid) {
      this.processing = true;
      this.user.username = this.username;
      this.authService.updateUser(this.user)
      .then((result) => {
        this.error = null;
        this.processing = false;
        this.feedbackEnabled = false;
        this.router.navigate(['/profile']);
      })
      .catch((err) => {
        this.error = err.error;
        this.processing = false;
        this.feedbackEnabled = false;
      });
    }
  }
}
