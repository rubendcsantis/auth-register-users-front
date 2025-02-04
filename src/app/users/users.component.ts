import {Component} from '@angular/core';
import {Toast} from 'primeng/toast';
import {TableModule} from 'primeng/table';
import {FormsModule} from '@angular/forms';
import {InputText} from 'primeng/inputtext';
import {Select} from 'primeng/select';
import {Tag} from 'primeng/tag';
import {ButtonDirective} from 'primeng/button';
import {Ripple} from 'primeng/ripple';
import {UserTable} from '../interfaces/interfaces';
import {MessageService, SelectItem} from 'primeng/api';
import {UserService} from '../services/user.service';
import {NgIf} from '@angular/common';
import {PostService} from '../services/post.service';
import {NavbarComponent} from '../navbar/navbar.component';

@Component({
  selector: 'app-users',
  imports: [
    Toast,
    TableModule,
    FormsModule,
    InputText,
    Select,
    Tag,
    ButtonDirective,
    Ripple,
    NgIf,
    NavbarComponent
  ],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css',
  providers: [UserService, MessageService, PostService]
})
export class UsersComponent {
  users!: UserTable[];
  roles!: SelectItem[];

  clonedUsers: { [s: string]: UserTable } = {};

  constructor(
    private userService: UserService,
    private postService: PostService,
    private messageService: MessageService
  ) {
  }

  ngOnInit() {
    this.userService.getUsers().then((data) => {
      this.users = data.map((user: any) => {
        return {
          id: user.id,
          name: user.name,
          role: user.role,
          email: user.email,
          createdAt: this.postService.formatDateToLocal(user.created_at),
        };
      });
    });


    this.roles = [
      {label: 'Administrator', value: 'admin'},
      {label: 'User', value: 'user'},
    ];
  }

  onRowEditInit(user: UserTable) {
    this.clonedUsers[user.id as number] = {...user};
  }

  onRowEditSave(user: UserTable) {
    if ( this.isEmpty(user.name) || this.isEmpty(user.email)
    ) {
      this.messageService.add({severity: 'error', summary: 'Error', detail: 'Empty fields, please complete'});
    } else if(!this.isValidEmail(user.email)){
      this.messageService.add({severity: 'error', summary: 'Error', detail: 'Email address is invalid'});
    }else {
      this.userService.updateUsers(Number(user.id), {
        name: String(user.name),
        email: String(user.email),
        role: String(user.role)
      }).then((data) => {
        this.messageService.add({severity: 'success', summary: 'Success', detail: 'User is updated'});
      });
    }
    return false;
  }

  onRowEditCancel(user: UserTable, index: number) {
    this.users[index] = this.clonedUsers[user.id as number];
    delete this.clonedUsers[user.id as number];
  }

  isValidEmail(email = ""): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  isEmpty(value: any): boolean {
    return (
      value === null ||
      value === undefined ||
      (typeof value === "string" && value.trim() === "") ||  // String vacío
      (Array.isArray(value) && value.length === 0) ||       // Array vacío
      (typeof value === "object" && Object.keys(value).length === 0) // Objeto vacío
    );
  }

}
