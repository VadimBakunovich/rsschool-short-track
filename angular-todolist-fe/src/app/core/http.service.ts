import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Todo } from '../share/models';

@Injectable()
export class HttpService {

  constructor(private http: HttpClient) {}

  getData() {
    const { API_PARAMS_QUERY, API_PARAMS_VALUE } = environment;
    const params = new HttpParams().set(API_PARAMS_QUERY, API_PARAMS_VALUE);
    return this.http.get<Todo[]>('', { params });
  }
  
  postData(data: Todo) {
    return this.http.post<Todo>('', data);
  }

  editData(data: Todo) {
    return this.http.patch<Todo>(`${data.id}`, data);
  }

  delData(id: number) {
    return this.http.delete(`${id}`);
  }
}
