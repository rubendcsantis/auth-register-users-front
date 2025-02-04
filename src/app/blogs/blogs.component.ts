import {Component} from '@angular/core';
import {NavbarComponent} from '../navbar/navbar.component';
import {Post} from '../interfaces/interfaces';
import {PostService} from '../services/post.service';
import {TableModule} from 'primeng/table';
import {IconField} from 'primeng/iconfield';
import {InputIcon} from 'primeng/inputicon';
import {InputText} from 'primeng/inputtext';
import {Button} from 'primeng/button';
import {MessageService} from 'primeng/api';
import {Toast} from 'primeng/toast';
import {UserService} from '../services/user.service';

@Component({
  selector: 'app-blogs',
  imports: [
    NavbarComponent,
    TableModule,
    Button,
    Toast,
    IconField,
    InputIcon,
    InputText,
  ],
  templateUrl: './blogs.component.html',
  styleUrl: './blogs.component.css',
  providers: [MessageService, PostService, UserService],
})
export class BlogsComponent {
  posts!: Post[];

  constructor(private postService: PostService, private userService: UserService, private messageService: MessageService) {}

  ngOnInit() {
    const token = this.userService.getToken();
    this.postService.getPosts(token).then((data: any) => {
      this.posts = data;
    });
  }

  selectPost(post: Post) {
    this.messageService.add({ severity: 'info', summary: 'Post Selected', detail: post.title });
  }
}
