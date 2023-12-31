import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, PatternValidator } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;

  constructor(private fb: FormBuilder, private userService: UserService) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, { validator: this.mustMatch('password', 'confirmPassword') });
  }


  onSubmit(): void {
    if (this.registerForm.valid) {
      const newUser = new User(
        this.registerForm.value.email,
        this.registerForm.value.password
      );
      this.userService.register(newUser).subscribe({
        next: (response) => {
          console.log('Registration successful', response);
          // Handle successful registration
        },
        error: (error) => {
          console.error('Registration failed', error);
          // Handle registration error
        },
        complete: () => {
          // Code for when the Observable completes
        }
      });
    }
  }


  mustMatch(password: string, confirmPassword: string) {
    return (formGroup: FormGroup) => {
      const passwordControl = formGroup.controls[password];
      const confirmPasswordControl = formGroup.controls[confirmPassword];

      // slučaj kada je drugi validator već našao grešku na kontroli za potvrdu lozinke
      if (confirmPasswordControl.errors && !confirmPasswordControl.errors['mustMatch']) {
        return;
      }

      // lozinke se ne podudaraju
      if (passwordControl.value !== confirmPasswordControl.value) {
        confirmPasswordControl.setErrors({ mustMatch: true });
      } else {
        confirmPasswordControl.setErrors(null);
      }
    };
  }

}
