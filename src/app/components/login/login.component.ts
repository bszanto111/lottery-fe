import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { SelectItem } from 'primeng/api';
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
  userSelectItems: SelectItem<User>[] = [];
  hasAlreadyTriedToLogIn: boolean = false;
  errorMessage: string;

  loginForm: FormGroup;
  userDropdownControl: FormControl;
  userIdInputControl: FormControl;
  passwordControl: FormControl;

  constructor(
    private loginService: LoginService,
    private userService: UserService,
    private router: Router) { }

  ngOnInit(): void {
    this.initializeForm();
    this.userService.getUsers().subscribe(
      users => {
        this.users = users;
        this.userSelectItems = users.map(user => {
          return {
            label: user.id + " - " + user.name,
            value: user
          }
        });
      }
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

  initializeForm(): void {
    this.userDropdownControl = new FormControl(null);
    this.userIdInputControl = new FormControl(null);
    this.passwordControl = new FormControl(null);
    this.loginForm = new FormGroup({
      userDropdown: this.userDropdownControl,
      userIdInput: this.userIdInputControl,
      password: this.passwordControl
    });
    this.userDropdownControl.valueChanges.subscribe(
      (user: User) => {
        if (user) {
          this.userIdInputControl.setValue(user.id);
        }
      }
    );
  }

  login() {
    this.loginService.login(this.userIdInputControl.value, this.passwordControl.value);
    this.hasAlreadyTriedToLogIn = true;
  }
}
