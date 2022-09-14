import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  userValue = this.authService.userValue
  displayedColumns: string[] = ["email", "name", "username", "role", "createdOn", "updatedOn", "active", "action"];
  users!: any[]; 
  dataSource!: MatTableDataSource<any>;
  deleted = false;
  routerSubscription: any;
  userSubscription: any;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private authService: AuthService, 
    private userService: UserService, 
    private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.userSubscription = this.userService.getUsers().subscribe({ 
      next: users => (
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

  openConfirmationWindow(name: string, id: number) {
    if(confirm("Tem certeza que quer deletar "+ name + "?")) {
      this.userService.delete(id).subscribe(() => (
        this.deleted = true,
        this.ngOnInit(),
        this.openSnackBar("Usuário deletado com sucesso!")
      ));
    }
  }

  openSnackBar(message: string) {
    if (this.deleted) {
      this._snackBar.open(message);
      this._snackBar._openedSnackBarRef?._dismissAfter(5000);
    }  
  }

}