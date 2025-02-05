import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment.development';
import {PostTable, User} from '../interfaces/interfaces';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private readonly myAppUrl: string;

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.back_url;
  }

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

  savePost(post: PostTable, token: string): Observable<any> {

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      "Content-Type": "application/json",
    });

    return this.http.post(`${this.myAppUrl}/posts`, post, { headers });
  }


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
