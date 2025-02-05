import {Component} from '@angular/core';
import {Editor} from 'primeng/editor';
import {FormControl, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {InputText} from 'primeng/inputtext';
import {Panel} from 'primeng/panel';
import {ButtonDirective} from 'primeng/button';
import {NavbarComponent} from '../navbar/navbar.component';
import {MessageService} from 'primeng/api';
import {UserService} from '../services/user.service';
import {PostService} from '../services/post.service';
import {PostTable} from '../interfaces/interfaces';
import {Ripple} from 'primeng/ripple';
import {Toast} from 'primeng/toast';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-editpost',
  imports: [
    Editor,
    FormsModule,
    ReactiveFormsModule,
    InputText,
    Panel,
    ButtonDirective,
    NavbarComponent,
    Ripple,
    Toast
  ],
  templateUrl: './editpost.component.html',
  styleUrl: './editpost.component.css',
  providers: [MessageService, PostService, UserService]
})
export class EditpostComponent {

  constructor(
    private messageService: MessageService,
    private postService: PostService,
    private userService: UserService,
    // private route: ActivatedRoute
  ) {
  }

  title = new FormControl('', [Validators.required, Validators.min(3)]);
  content = new FormControl('', [Validators.required, Validators.min(10)]);

  ngOnInit() {
    // this.route.queryParams.subscribe(params => {
    //   this.title = params['title'];
    //   this.content = params['content'];
    // });
    // const navigation = history.state;
    // this.title = navigation?.title;
    // this.content = navigation?.content;
    // const userId = +this.route.snapshot.paramMap.get('id')!;
    // console.log(userId);
    // this.route.params.subscribe(params => {
    //   this.title = params['title'];
    //   this.content = params['content'];
    // });
  }

  onSubmit() {
    if (!this.title.valid || !this.content.valid) {
      this.messageService.add({severity: 'warn', summary: 'Complete the form'});
      return
    }

    const post: PostTable = {
      title: String(this.title.value),
      content: String(this.content.value)
    }
    const token = this.userService.getToken();

    this.postService.savePost(post, token).subscribe(() => {
      this.messageService.add({severity: 'success', summary: 'New Post created successfully'});
      this.title.setValue('');
      this.content.setValue('');
    })

  }
}
