import {Component} from '@angular/core';
import {Avatar} from 'primeng/avatar';
import {MegaMenuItem} from 'primeng/api';
import {MegaMenuModule} from 'primeng/megamenu';
import {NgClass, NgIf} from '@angular/common';
import {Ripple} from 'primeng/ripple';
import {Button} from 'primeng/button';
import {Router, RouterLink} from '@angular/router';
import {UserService} from '../services/user.service';

@Component({
  selector: 'app-navbar',
  imports: [
    MegaMenuModule,
    Avatar,
    NgClass,
    NgIf,
    Ripple,
    Button,
    RouterLink
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
  providers: [UserService, Router]
})
export class NavbarComponent {
  items: MegaMenuItem[] | undefined;
  nameUser = "";
  nameRole = "";
  constructor(private service: UserService, private router: Router) {
  }

  ngOnInit() {
    const userArray = this.service.getUserCookies()
    this.nameUser = userArray.name;
    this.nameRole = userArray.role;


    this.items = [
      {
        label: 'Post',
        root: true,
        route: '/posts-table',
        show: true
      },
      {
        label: 'Users',
        root: true,
        route: '/users',
        show: (this.nameRole === 'admin'),
      },
      {
        label: 'Create Post',
        root: true,
        route: '/edit-post',
        show: (this.nameRole === 'admin'),
      }
    ];
  }

  logout(): void {
    this.service.deleteToken();
    this.router.navigate(['/login']);
  }
}
