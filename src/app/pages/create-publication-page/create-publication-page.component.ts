import { Component, OnInit } from '@angular/core';
import { Router } from '../../../../node_modules/@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-create-publication-page',
  templateUrl: './create-publication-page.component.html',
  styleUrls: ['./create-publication-page.component.css']
})
export class CreatePublicationPageComponent implements OnInit {

  title = '';
  loading = true;
  anon: boolean;
  user: any;
  feedbackEnabled = false;
  error = null;
  processing = false;
  publication: string;

  constructor(private userService: UserService, private router: Router) {
    this.publication = '';
  }

  ngOnInit() {
  }

  submitPublication(form) {
    console.log(form);
    this.error = '';
    this.feedbackEnabled = true;
    if (form.valid) {
      this.processing = true;
      this.userService.addPublication(form.value)
      .then(() => {
        this.router.navigate(['/profile']);
        form.reset();
      })
      .catch((err) => {
        this.error = err.error;
        this.processing = false;
        this.feedbackEnabled = false;
      });
    }
  }

}
