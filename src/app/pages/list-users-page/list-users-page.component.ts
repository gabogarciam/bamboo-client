import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-list-users-page',
  templateUrl: './list-users-page.component.html',
  styleUrls: ['./list-users-page.component.css']
})
export class ListUsersPageComponent implements OnInit {

  title = "Users";
  url: string;
  usersDb: any;
  userFind: any;
  counters: any;
  following: any;
  followed: any;

  constructor(private userService: UserService, private router: Router) {
    this.url = this.userService.url;
  }

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.userService.getUsers()
    .then((data) => {
      this.usersDb = data;
      console.log(this.usersDb);
      let users = Object.keys(this.usersDb);
      for (let i = 0; i < users.length; i++) {
        this.getCounterId(i);
        // console.log(this.usersDb[i]);
        // console.log(this.usersDb[i]._id);
      }
    })
    .catch((error) => {
      console.log(error);
    })

    this.getUsersFollow();
    this.getUsersFollowing();
  }

  getCounterId(i) {
    // console.log(this.usersDb[i].username)
    this.userService.getCounterId(this.usersDb[i]._id)
    .then((data) => {
      this.counters = data;
      // console.log(this.counters);
    })
    .catch((error) => {
      console.log(error);
    })
  }

  getUsersFollowing() {
    this.userService.getFollowingUser()
    .then((data) => {
      this.following = data;
      console.log(this.following);
    })
    .catch((error) => {
      console.log(error);
    })
  }

  getUsersFollow() {
    this.userService.getFollowUser()
    .then((data) => {
      this.followed = data;
      console.log(this.followed);
    })
    .catch((error) => {
      console.log(error);
    })
  }

  getUser() {
    this.userService.getUser()
    .then((data) => {
      this.userFind = data;
    })
    .catch((error) => {
      console.log(error);
    })
  }
}
