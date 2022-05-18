import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { LoginService } from 'src/app/services/login.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  users: User[];
  selectedUserId: string;
  password: string;
  hasAlreadyTriedToLogIn: boolean = false;
  errorMessage: string;

  constructor(
    private loginService: LoginService,
    private userService: UserService,
    private router: Router) { }

  ngOnInit(): void {
    this.userService.getUsers().subscribe(
      users => this.users = users
    );
    this.loginService.isLoggedIn$.subscribe(isLoggedIn => {
      if (isLoggedIn) {
        this.router.navigate(['/game']);
      }
      else if (this.hasAlreadyTriedToLogIn) {
        this.errorMessage = 'User ID or password is wrong.'
      }
    });
  }

  selectUser(event, user) {
    this.selectedUserId = user.id;
  }

  login() {
    this.loginService.login(this.selectedUserId, this.password);
    this.hasAlreadyTriedToLogIn = true;
  }
}
