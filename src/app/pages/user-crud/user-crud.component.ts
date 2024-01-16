import { Component, EventEmitter, HostBinding, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-crud',
  templateUrl: './user-crud.component.html',
  styleUrls: ['./user-crud.component.css']
})
export class UserCrudComponent implements OnInit {
  users: User[] = [];

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.getUsers();
  }

  private getUsers() {
    this.userService.getUsers().subscribe(users => {
      console.log("getRooms called by UserCRUD");
      this.users = users;
    });
  }

  deleteUser(id: number): void {
    console.log('UserCRUDComponent requesting deletion of user with id:', id);
    this.userService.deleteUser(id);
  }
}