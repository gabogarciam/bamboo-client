import { Component, OnInit } from '@angular/core';

import { Router } from '../../../../node_modules/@angular/router';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { FileUploader } from '../../../../node_modules/ng2-file-upload';


@Component({
  selector: 'app-profile-edit-page',
  templateUrl: './profile-edit-page.component.html',
  styleUrls: ['./profile-edit-page.component.css']
})
export class ProfileEditPageComponent implements OnInit {
  uploader: FileUploader = new FileUploader({
    url: `/upload-avatar/`
  });

  loading = true;
  anon: boolean;
  user: any;
  feedbackEnabled = false;
  error = null;
  processing = false;
  username : string = '';

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
      this.user.username = this.username;
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
