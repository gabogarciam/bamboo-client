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
    url: URL + '/upload-avatar', itemAlias: 'photo'
  });

  title = 'Edit profile';
  loading = true;
  anon: boolean;
  user: any;
  feedbackEnabled = false;
  error = null;
  processing = false;
  username : string;
  bio : string;
  email : string;
  url : string;
  image: string;

  constructor(private userService: UserService, private authService: AuthService, private router: Router) {
    this.url = this.userService.url;
  }

  ngOnInit() {
    this.user = this.authService.getUser();
    this.authService.userChange$.subscribe((user) => {
      this.loading = false;
      this.user = user;
      this.anon = !user;
      //this.getAvatar();
    });
    this.uploader.onAfterAddingFile = (file)=> { file.withCredentials = true; };
    this.uploader.onCompleteItem = (item:any, response:any, status:any, headers:any) => {
      console.log("ImageUpload:uploaded:", item, status, response);
    };
    //this.getAvatar();

    const input = document.querySelector('input'),
          button = document.querySelector('img');

    // input.addEventListener('click', (e) => {
    //   button.on(click)
    // })
  }

  submitForm(form) {
    this.error = '';
    this.feedbackEnabled = true;
    if (form.valid) {
      this.processing = true;
      this.uploader.uploadAll();
      this.userService.update(this.user)
      .then(() => {
        this.router.navigate(['/profile']);
      })
      .catch((err) => {
        this.error = err.error;
        this.processing = false;
        this.feedbackEnabled = false;
      });
    }
  }

  getAvatar() {
    this.userService.getAvatar()
      .then( image => {this.image = image});
  }

  // submitAvatar() {
  //   this.uploader.uploadAll();
  //   // localStorage.setItem
  // }

  public filesToUpload: Array<File>;

  FileChangeEvent(fileInput: any) {
    this.filesToUpload = <Array<File>>fileInput.target.files;
  }
}
