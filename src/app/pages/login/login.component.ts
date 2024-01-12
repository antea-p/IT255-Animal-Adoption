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
    // Očisti bilo kakav mogući redirectUrl, kako bi se spriječilo neželjeno preusmjeravanje
    if (this.userService.redirectUrl) {
      this.userService.redirectUrl = null;
    }
  }

  get email() {
    return this.loginForm.get("email");
  }

  get password() {
    return this.loginForm.get("password");
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const user: User = {
        ...this.loginForm.value
      };
      console.log(`LoginComponent user: ${user}`);
      this.userService.login(user).subscribe({
        next: (user) => {
          if (user) {
            // Ako je korisnik preusmjeren sa stranice /detail/:id, bit će preusmjeren natrag
            // na tu stranicu, inače će biti preusmjeren na početnu stranicu
            const redirect = this.userService.redirectUrl ? this.userService.redirectUrl : '/home';
            this.router.navigate([redirect]);
            this.userService.redirectUrl = null; // Resetiranje redirectUrl-a
          } else {
            this.loginErrorMessage = 'Incorrect email or password.';
            console.log(this.loginErrorMessage);
          }
        },
        error: (error) => {
          this.loginErrorMessage = 'An error occurred during login. Please try again later.';
          console.log(error);
        }
      });
    }
  }


}
