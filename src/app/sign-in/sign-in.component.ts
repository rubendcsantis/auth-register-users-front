import {Component} from '@angular/core';
import {ButtonDirective} from "primeng/button";
import {FormControl, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {InputText} from "primeng/inputtext";
import {Ripple} from "primeng/ripple";
import {Router, RouterLink} from "@angular/router";
import {User} from '../interfaces/interfaces';
import {NgIf} from '@angular/common';
import {Toast} from 'primeng/toast';
import {MessageService} from 'primeng/api';
import {UserService} from '../services/user.service';

@Component({
  selector: 'app-sign-in',
  imports: [
    ButtonDirective,
    FormsModule,
    InputText,
    ReactiveFormsModule,
    Ripple,
    RouterLink,
    NgIf,
    Toast
  ],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css',
  providers: [MessageService, UserService, Router],
})

export class SignInComponent {

  constructor( private messageService: MessageService, private userService: UserService, private router: Router) { }

  name = new FormControl("", Validators.required);
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required, Validators.min(6)]);
  password_confirmation = new FormControl('', [Validators.required, Validators.min(6)]);

  onSubmit() {
    if(!this.name.valid || !this.email.valid || !this.password.valid || !this.password_confirmation.valid){
      this.messageService.add({ severity: 'warn', summary: 'Complete the form' });
      return
    }

    if (this.password.value != this.password_confirmation.value) {
      this.messageService.add({ severity: 'error', summary: 'Passwords do not match' });
      return
    }

    const user: User = {
      name: String(this.name.value).trim(),
      email: String(this.email.value).trim(),
      role: 'user',
      password: String(this.password.value),
      password_confirmation: String(this.password_confirmation.value)
    }

    this.userService.signIn(user).subscribe({
      next: (response) => {
        this.messageService.add({ severity: 'success', summary: `User ${user.name} register successfully. Redirect...` });
        setTimeout(() => {
          this.router.navigate(['/login']);
        },1000)
      },
      error: ($e) => {
        const response = JSON.parse($e.error);
        for (const key in response) {
          response[key].forEach((message: string) => {
            this.messageService.add({ severity: 'error', summary: `${message}` });
          });
        }
      }
    })
  }
}
