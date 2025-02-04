import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import {Checkbox} from 'primeng/checkbox';
import {InputText} from 'primeng/inputtext';
import {Ripple} from 'primeng/ripple';
import {RouterLink} from '@angular/router';
@Component({
  selector: 'app-login',
  imports: [
    FormsModule,
    ButtonModule,
    Checkbox,
    InputText,
    Ripple,
    RouterLink,
  ],
  templateUrl: './login.component.html',
})

export class LoginComponent {
  username: string = '';
  password: string = '';

  onSubmit() {
    // Implement your login logic here
    console.log('Username:', this.username);
    console.log('Password:', this.password);
    // Add authentication logic and navigate to the next page upon successful login
  }
}
