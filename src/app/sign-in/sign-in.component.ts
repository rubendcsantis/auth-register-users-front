import { Component } from '@angular/core';
import {ButtonDirective} from "primeng/button";
import {Checkbox} from "primeng/checkbox";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {InputText} from "primeng/inputtext";
import {Ripple} from "primeng/ripple";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-sign-in',
  imports: [
    ButtonDirective,
    FormsModule,
    InputText,
    ReactiveFormsModule,
    Ripple,
    RouterLink
  ],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent {
  username: string = '';
  password: string = '';
  onSubmit() {
    // Implement your login logic here
    console.log('Username:', this.username);
    console.log('Password:', this.password);
    // Add authentication logic and navigate to the next page upon successful login
  }
}
