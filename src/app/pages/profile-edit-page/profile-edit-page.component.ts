import { Component, OnInit } from '@angular/core';

import { Router } from '../../../../node_modules/@angular/router';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { FileUploader } from '../../../../node_modules/ng2-file-upload';
import { environment } from '../../../environments/environment';

const URL = environment.apiUrl + 'user';

@Component({
  selector: 'app-profile-edit-page',
  templateUrl: './profile-edit-page.component.html',
  styleUrls: ['./profile-edit-page.component.css']
})
export class ProfileEditPageComponent implements OnInit {
  uploader: FileUploader = new FileUploader({
    url: URL
  });

  loading = true;
  anon: boolean;
  user: any;
  feedbackEnabled = false;
  error = null;
  processing = false;
  username : string = '';
  bio : string = '';
  email : string = '';
  title = 'Edit profile';

  constructor(private userService: UserService, private authService: AuthService, private router: Router) {}

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
      this.user.username = form.value.username;
      this.user.email = form.value.email;
      this.user.bio = form.value.biography;
      this.userService.update(this.user)
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

  submitAvatar() {
    this.uploader.uploadAll();
  }
}
