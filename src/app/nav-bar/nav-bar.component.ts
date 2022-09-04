import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  mobileQuery: MediaQueryList;

  private _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private authService: AuthService) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  // user: any;
  value = '';
  isLoggedIn = false;
  user = this.authService.userValue
  

  ngOnInit(): void {
  }

  logout() {
    this.authService.logout()
    window.location.reload();
  }

}
