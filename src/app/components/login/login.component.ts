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
  errorMessage: string;

  constructor(
    private loginService: LoginService,
    private userService: UserService,
    private router: Router) { }

  async ngOnInit(): Promise<void> {
    this.users = await this.userService.getUsers();
  }

  selectUser(event, user) {
    this.selectedUserId = user.id;
  }

  async login() {
    this.loginService.login(this.selectedUserId, this.password).then(canLogin => {
      if (canLogin) {
        this.router.navigate(['/game']);
      }
      else {
        this.errorMessage = 'User ID or password is wrong.'
      }
    });
  }
}
