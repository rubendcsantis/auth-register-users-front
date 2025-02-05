import {Component} from '@angular/core';
import {NavbarComponent} from '../navbar/navbar.component';
import {Post} from '../interfaces/interfaces';
import {PostService} from '../services/post.service';
import {TableModule} from 'primeng/table';
import {IconField} from 'primeng/iconfield';
import {InputIcon} from 'primeng/inputicon';
import {InputText} from 'primeng/inputtext';
import {MessageService} from 'primeng/api';
import {Toast} from 'primeng/toast';
import {UserService} from '../services/user.service';
import {Router} from '@angular/router';
import {Button} from 'primeng/button';

@Component({
  selector: 'app-blogs',
  imports: [
    NavbarComponent,
    TableModule,
    Toast,
    IconField,
    InputIcon,
    InputText,
    Button,
  ],
  templateUrl: './blogs.component.html',
  styleUrl: './blogs.component.css',
  providers: [MessageService, PostService, UserService, Router],
})
export class BlogsComponent {
  posts!: Post[];
  constructor(
    private postService: PostService,
    private userService: UserService,
    private messageService: MessageService,
    private router: Router,
  ) {
  }

  ngOnInit() {
    const token = this.userService.getToken();
    this.postService.getPosts(token).then((data: any) => {
      this.posts = data;
    });
  }

  viewPost(post: Post) {
    // if (post.content != null) {
    //   const html = this.sanitizer.bypassSecurityTrustHtml(post.content);
    //   this.messageService.add({ severity: 'info', summary: 'Post Selected', detail: String(html) });
    // }
  }
}
