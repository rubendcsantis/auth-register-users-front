import { Routes } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {SignInComponent} from './sign-in/sign-in.component';
import {BlogsComponent} from './blogs/blogs.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'sign-in', component: SignInComponent },
  { path: 'posts-table', component: BlogsComponent},
  { path: '**', redirectTo: 'login', pathMatch: 'full' },
];

