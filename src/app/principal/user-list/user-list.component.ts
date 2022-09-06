import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  constructor(private authService: AuthService, private userService: UserService) { }

  userValue = this.authService.userValue

  users: any[] = []; 

  ngOnInit(): void {
    this.userService.getAll().subscribe({ 
      next: users => { this.users = users}, 
      error: error => console.log(error)});
  }

}
