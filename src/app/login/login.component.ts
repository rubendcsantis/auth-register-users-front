import { Component } from '@angular/core';
import {FormControl, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import {InputText} from 'primeng/inputtext';
import {Ripple} from 'primeng/ripple';
import {Router, RouterLink} from '@angular/router';
import {NgIf} from '@angular/common';
import {MessageService} from 'primeng/api';
import {UserService} from '../services/user.service';
import {UserLogin} from '../interfaces/interfaces';
import {Toast} from 'primeng/toast';
@Component({
  selector: 'app-login',
  imports: [
    FormsModule,
    ButtonModule,
    InputText,
    Ripple,
    RouterLink,
    NgIf,
    ReactiveFormsModule,
    Toast,
  ],
  templateUrl: './login.component.html',
  providers: [MessageService, UserService, Router],
})

export class LoginComponent {

  constructor( private messageService: MessageService, private userService: UserService, private router: Router) { }

  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required, Validators.min(6)]);

  onSubmit() {
    if(!this.email.valid || !this.password.valid){
      this.messageService.add({ severity: 'warn', summary: 'Complete the form' });
      return
    }
    const user: UserLogin = {
      email: String(this.email.value).trim(),
      password: String(this.password.value)
    }
    this.userService.login(user).subscribe({
      next: (response) => {
        this.messageService.add({ severity: 'success', summary: ` register successfully. Redirect...` });
        setTimeout(() => {
          this.router.navigate(['/post-table']);
        },1000)
        this.userService.setToken(response.access_token, response.expires_in)
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
