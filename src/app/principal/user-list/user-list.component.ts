import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  userValue = this.authService.userValue
  displayedColumns: string[] = ["email", "name", "username", "role", "createdOn", "updatedOn", "active"];
  users!: any[]; 
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private authService: AuthService, private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getAll().subscribe({ 
      next: users => (
      // console.log(users),
      this.users = users, 
      this.dataSource = new MatTableDataSource(users),
      this.dataSource.paginator = this.paginator,
      this.dataSource.sort = this.sort),
      error: error => console.log(error)});
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  // private _filterStates(value: string): State[] {
  //   const filterValue = value.toLowerCase();

  //   return this.users.filter(state => state.Name.toLowerCase().indexOf(filterValue) === 0);
  // }

}
