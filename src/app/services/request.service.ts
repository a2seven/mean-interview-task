import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { httpParams } from '../modules/shared/utils/httpParams';

@Injectable({ providedIn: 'root' })
export class RequestService {
  // private baseURL = `http://localhost:3000/api/`;
  private baseURL = `http://a2seven-interview-task.eu-4.evennode.com/api/`;
  constructor(private http: HttpClient) {}

  get(url: string, params: any = {}): Observable<any> {
    return this.http.get(this.baseURL + url, { params: httpParams(params) });
  }

  post(url: string, body: any): Observable<any> {
    return this.http.post(this.baseURL + url, body);
  }

  put(url: string, body: any): Observable<any> {
    return this.http.put(this.baseURL + url, body);
  }

  delete(url: string) {
    return this.http.delete(this.baseURL + url);
  }
}
