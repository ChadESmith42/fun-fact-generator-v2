import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { Login } from '../models/login';
import { map, Observable } from 'rxjs';
import { LoginResponse } from '../models/login-response';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _http: HttpClient = inject(HttpClient);
  private _user: WritableSignal<User> = signal<User>({
    id: 0, username: '', email: '',
    firstName: '',
    lastName: '',
    dob: ''
  });
  token: WritableSignal<string> = signal<string>('');

  login(payload: Login): Observable<LoginResponse> {
    return this._http.post<LoginResponse>('/api/user/login', payload).pipe(map((response: LoginResponse) => {
      if(response.user) {
        this._user.set(response.user);
      }
      if(response.token) {
        this.token.set(response.token);
      }
      return response;
    }));
  }
}
