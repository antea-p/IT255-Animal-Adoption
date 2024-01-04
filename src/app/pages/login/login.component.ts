import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  loginErrorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  get email() {
    return this.loginForm.get("email");
  }

  get password() {
    return this.loginForm.get("password");
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const user = new User(
        this.loginForm.value.email,
        this.loginForm.value.password
      );
      this.userService.login(user).subscribe(
        user => {
          if (!user) {
            this.loginErrorMessage = 'Incorrect email or password.';
            console.log(this.loginErrorMessage);
          } else {
            console.log("Success!");
            this.userService.setCurrentUser(user);
            this.router.navigate(['/home']);
          }
        },
        error => {
          this.loginErrorMessage = 'An error occurred during login. Please try again later.';
          console.log(error);
        }
      );
    }
  }

}
