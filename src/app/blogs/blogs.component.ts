import {Component} from '@angular/core';
import {NavbarComponent} from '../navbar/navbar.component';
import {Product} from '../interfaces/interfaces';
import {Tag} from 'primeng/tag';
import {PostService} from '../../services/postservice';
import {TableModule} from 'primeng/table';
import {IconField} from 'primeng/iconfield';
import {InputIcon} from 'primeng/inputicon';
import {InputText} from 'primeng/inputtext';
import {Button} from 'primeng/button';
import {MessageService} from 'primeng/api';
import {Toast} from 'primeng/toast';

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
  providers: [MessageService, PostService],
})
export class BlogsComponent {
  products!: Product[];

  constructor(private productService: PostService, private messageService: MessageService) {}

  ngOnInit() {
    this.productService.getCustomersLarge().then((data: any) => {
      this.products = data;
    });
  }

  selectProduct(product: Product) {
    this.messageService.add({ severity: 'info', summary: 'Product Selected', detail: product.name });
  }
}
