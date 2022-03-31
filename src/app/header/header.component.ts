import { AuthService } from './../auth/auth-services/auth.service';
import { Router } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  active_wrap = false;
  disactive_wrap = true;
  collapse = false;
  @Input() signedin = false;
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authService.signedin$.subscribe((signedin: any) => {
      this.signedin = signedin;
    });
    this.signedin= this.authService.loggedIn();
  }
  onWrapper() {
    this.active_wrap = !this.active_wrap;
    this.disactive_wrap = !this.disactive_wrap;
    this.menuOnClick();
  }
  menuOnClick() {
    document.getElementById('menu-bar')?.classList.toggle('change');
    document.getElementById('nav')?.classList.toggle('change');
  }
  onMenuItemClick() {
    this.onWrapper();
    const checkbox_menu = document.querySelector(
      '.checkbox-menu'
    ) as HTMLInputElement;
    checkbox_menu.checked = false;
  }
  onSignOut() {
    this.authService.logout();
    this.authService.signedin$.subscribe((signedin: any) => {
      this.signedin = signedin;
    });
    this.onMenuItemClick();
    this.router.navigate(['/home']);
  }
}
