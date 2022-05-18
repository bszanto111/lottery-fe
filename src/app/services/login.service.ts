import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  
  private _isLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject(false);

  public readonly isLoggedIn$: Observable<boolean> = this._isLoggedIn.asObservable();

  constructor(private http: HttpClient) { }

  login(userId: string, password: string): Observable<boolean> {
    let loginResult$ = this.http.post<boolean>('http://localhost:8080/api/login', {userId, password});
    loginResult$.subscribe(
      loginResult => {
        this._isLoggedIn.next(loginResult);
      });
    return loginResult$;
  }

  logout() {
    this._isLoggedIn.next(false);
  }
}
