import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, PatternValidator } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  minPasswordLen: number = 6;
  registrationError: string = '';
  constructor(private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(this.minPasswordLen)]],
      confirmPassword: ['', Validators.required]
    }, { validator: this.mustMatch('password', 'confirmPassword') });
  }

  get email() {
    return this.registerForm.get('email');
  }

  get password() {
    return this.registerForm.get('password');
  }

  get confirmPassword() {
    return this.registerForm.get('confirmPassword');
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      const registerFormValues = {
        ...this.registerForm.value,
        isAdmin: false
      };
      delete registerFormValues.confirmPassword;

      const newUser: User = {
        ...registerFormValues
      };

      this.userService.register(newUser).subscribe({
        next: (response) => {
          console.log('Registration successful', response);
          this.router.navigate(['/home']);
        },
        error: (error) => {
          this.registrationError = 'User with this email already exists!';
          console.error('Registration failed', error);
        }
      });
    }
  }


  mustMatch(password: string, confirmPassword: string) {
    return (formGroup: FormGroup) => {
      const passwordControl = formGroup.controls[password];
      const confirmPasswordControl = formGroup.controls[confirmPassword];

      // Slučaj kad je drugi validator već našao grešku u kontroli confirmPassword
      if (confirmPasswordControl.errors && !confirmPasswordControl.errors['mustMatch']) {
        return;
      }

      // Podesi 'mustMatch' grešku ako validacija padne
      if (passwordControl.value !== confirmPasswordControl.value) {
        confirmPasswordControl.setErrors({ mustMatch: true });
      } else {
        // Ako se password i confirmPassword podudaraju, resetiraj greške
        confirmPasswordControl.setErrors(null);
      }
    };
  }


}
