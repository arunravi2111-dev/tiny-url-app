import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UrlService {
  redirectUrl = environment.apiBaseUrl;
  baseUrl = environment.apiBaseUrl+"/api/url";

    private refreshSubject = new Subject<void>();

  refresh$ = this.refreshSubject.asObservable();

  constructor(private http: HttpClient) {}

 getAll() {
  return this.http.get<any[]>(this.baseUrl, {
    headers: {
      'Accept': 'application/json'
    }
  });
}

  create(data: any) {
    return this.http.post(this.baseUrl, data);
  }

  delete(id: number) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  search(term: string) {
    return this.http.get<any[]>(`${this.baseUrl}?search=${term}`);
  }

  getShortUrl(shortCode: string): string {
    return `${this.redirectUrl}/${shortCode}`;
  }

  notifyRefresh() {
    this.refreshSubject.next();
  }
}