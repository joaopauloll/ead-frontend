import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NavigationEnd, Router } from '@angular/router';

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

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private authService: AuthService, 
    private userService: UserService, 
    private _snackBar: MatSnackBar, 
    private router: Router) { 
      // everything inside this constructor is to refresh the page without reloading the component after deleting user
      this.router.routeReuseStrategy.shouldReuseRoute = function () {
        return false;
      };
      this.routerSubscription = this.router.events.subscribe((event) => {
        if (event instanceof NavigationEnd) {
          // tell the router that I didn't visit or load the page previously
          this.router.navigated = false;
        }
      });
    }

  ngOnInit(): void {
    this.userService.getAll().subscribe({ 
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

  // private _filterStates(value: string): State[] {
  //   const filterValue = value.toLowerCase();

  //   return this.users.filter(state => state.Name.toLowerCase().indexOf(filterValue) === 0);
  // }

  // update(user: User): void {
  //   this.userService.update(user).subscribe({ 
  //     next: () => (user),
  //     error: error => console.log(error)});
  // }

  openConfirmationWindow(name: string, id: number) {
    if(confirm("Tem certeza que quer deletar "+ name + "?")) {
      this.userService.delete(id).subscribe(() => (
      this.router.navigate(["user-list"]).then(() => (
        this.deleted = true,
        this.openSnackBar("Usuário deletado com sucesso!")
        ))
      ));
    }
  }

  openSnackBar(message: string) {
    if (this.deleted) {
      this._snackBar.open(message);
      this._snackBar._openedSnackBarRef?._dismissAfter(5000);
    }  
  }

  ngOnDestroy() {
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }

}