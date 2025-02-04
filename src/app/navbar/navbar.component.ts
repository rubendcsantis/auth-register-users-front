import { Component } from '@angular/core';
import {Avatar} from 'primeng/avatar';
import { MegaMenuItem } from 'primeng/api';
import { MegaMenuModule } from 'primeng/megamenu';
import {NgClass, NgIf} from '@angular/common';
import {Ripple} from 'primeng/ripple';
import {Button} from 'primeng/button';

@Component({
  selector: 'app-navbar',
  imports: [
    MegaMenuModule,
    Avatar,
    NgClass,
    NgIf,
    Ripple,
    Button
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  items: MegaMenuItem[] | undefined;

  ngOnInit() {
    this.items = [
      {
        label: 'Company',
        root: true,
      },
      {
        label: 'Resources',
        root: true
      },
      {
        label: 'Contact',
        root: true
      }
    ];
  }
}
