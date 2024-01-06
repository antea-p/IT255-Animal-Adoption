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
  registerForm!: FormGroup;
  minPasswordLen: number = 6;

  // TODO: handle "user with that email already exists" case

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
      // TODO: typing
      const registerFormValues = { ...this.registerForm.value };
      delete registerFormValues.confirmPassword;
      const newUser: User = {
        ...registerFormValues
      };
      this.userService.register(newUser).subscribe({
        next: (response) => {
          console.log('Registration successful', response);
          // User is set in localStorage within UserService
          this.router.navigate(['/home']); // Redirect to home upon successful registration
        },
        error: (error) => {
          console.error('Registration failed', error);
          // Handle registration error
        }
      });
    }
  }


  mustMatch(password: string, confirmPassword: string) {
    return (formGroup: FormGroup) => {
      const passwordControl = formGroup.controls[password];
      const confirmPasswordControl = formGroup.controls[confirmPassword];

      // Case when a different validator has already found an error on the confirm password control
      if (confirmPasswordControl.errors && !confirmPasswordControl.errors['mustMatch']) {
        // Return early if another validator has found an error on the confirmPasswordControl
        return;
      }

      // Set the 'mustMatch' error on confirm password control if validation fails
      if (passwordControl.value !== confirmPasswordControl.value) {
        confirmPasswordControl.setErrors({ mustMatch: true });
      } else {
        // If they do match, remove the error if it exists
        confirmPasswordControl.setErrors(null);
      }
    };
  }


}
