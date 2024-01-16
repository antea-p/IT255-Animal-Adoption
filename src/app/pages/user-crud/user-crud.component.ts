import { Component, EventEmitter, HostBinding, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-crud',
  templateUrl: './user-crud.component.html',
  styleUrls: ['./user-crud.component.css']
})
export class UserCrudComponent implements OnInit {
  users: User[] = [];
  newUserForm = new FormGroup({});
  userModel: User = {
    id: 0,
    email: '',
    password: '',
    isAdmin: false
  };
  userFields: FormlyFieldConfig[] = [
    {
      key: 'email',
      type: 'input',
      templateOptions: {
        type: 'email',
        label: 'Email',
        placeholder: 'Enter email',
        required: true,
      }
    },
    {
      key: 'password',
      type: 'input',
      templateOptions: {
        type: 'password',
        label: 'Password',
        placeholder: 'Enter password',
        required: true,
      }
    }
  ];


  constructor(private userService: UserService) { }

  ngOnInit() {
    this.getUsers();
  }

  private getUsers() {
    this.userService.getUsers().subscribe(users => {
      console.log("getUsers called by UserCRUD");
      this.users = users;
    });
  }


  createUser(newUser: User): void {
    console.log('Adding user:', newUser);
    this.userService.createUser(newUser).subscribe((createdUser) => {
      console.log('User created:', createdUser);
      this.getUsers();
    });
  }

  editUser(user: User): void {
    this.userModel = { ...user }; // Napuni formu postojećim podacima
  }

  createOrUpdateUser(): void {
    if (this.userModel.id) {
      console.log('Updating user:', this.userModel);

      this.userService.updateUser(this.userModel).subscribe({
        next: updatedUser => {
          console.log('User updated:', updatedUser);
          this.getUsers();
        },
        error: err => console.error('Error updating user:', err)
      });
    } else {
      this.createUser(this.userModel);
    }
  }

  deleteUser(id: number): void {
    console.log('UserCRUDComponent requesting deletion of user with id:', id);
    this.userService.deleteUser(id);
  }
}