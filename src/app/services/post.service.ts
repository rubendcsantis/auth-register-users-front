import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  // getData() {
  //   return [
  //
  //   ];
  // }
  private readonly myAppUrl: string;

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.back_url;
  }
  // getCustomersMini() {
  //   return Promise.resolve(this.getData().slice(0, 5));
  // }
  //
  // getCustomersSmall() {
  //   return Promise.resolve(this.getData().slice(0, 10));
  // }
  //
  // getCustomersMedium() {
  //   return Promise.resolve(this.getData().slice(0, 50));
  // }
  //
  // getCustomersLarge() {
  //   return Promise.resolve(this.getData().slice(0, 200));
  // }
  //
  // getCustomersXLarge() {
  //   return Promise.resolve(this.getData());
  // }

  formatDateToLocal = (
    dateStr: string,
    locale: string = 'en-US',
  ) => {
    const date = new Date(dateStr);
    const options: Intl.DateTimeFormatOptions = {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    };
    const formatter = new Intl.DateTimeFormat(locale, options);
    return formatter.format(date);
  };


  async getPosts(params?: any) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${params}`,
      "Content-Type": "application/json",
    });
    const data = await this.http.get<any>(`${this.myAppUrl}/posts`, {headers: headers}).toPromise();
    return data.map((post: any) => {
      return {
        id: post.id, title: post.title,
        content: post.content,
        createdAt: this.formatDateToLocal(post.created_at)
      };
    });
  }
}
