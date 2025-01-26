import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private readonly http = inject(HttpClient);

  isLoggetIn = false;

  login(username: string, password: string) {
    return this.http.post<string>('https://fakestoreapi.com/auth/login', {
      username,
      password,
    });
  }
}
