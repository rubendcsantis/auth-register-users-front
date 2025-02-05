import { Routes } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {SignInComponent} from './sign-in/sign-in.component';
import {BlogsComponent} from './blogs/blogs.component';
import {UsersComponent} from './users/users.component';
import {EditpostComponent} from './editpost/editpost.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'sign-in', component: SignInComponent },
  { path: 'posts-table', component: BlogsComponent},
  { path: 'users', component: UsersComponent},
  { path: 'edit-post', component: EditpostComponent},
  // { path: 'edit-post/:id', component: EditpostComponent},
  { path: '**', redirectTo: 'login', pathMatch: 'full' },
];

