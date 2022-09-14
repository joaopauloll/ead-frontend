import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-log-list',
  templateUrl: './log-list.component.html',
  styleUrls: ['./log-list.component.css']
})
export class LogListComponent implements OnInit {

  userValue = this.authService.userValue
  displayedColumns: string[] = ["username", "action", "entityName", "entityId", "date"];
  logs!: any[]; 
  dataSource!: MatTableDataSource<any>;
  deleted = false;
  routerSubscription: any;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private authService: AuthService, 
    private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getLogs().subscribe({ 
      next: logs => (
      this.logs = logs, 
      this.dataSource = new MatTableDataSource(logs),
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

}