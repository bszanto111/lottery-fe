import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  async login(userId: string, password: string): Promise<boolean> {
    const loginResponse = await this.http.post('http://localhost:8080/api/login', {userId, password}).toPromise();
    return <boolean>loginResponse;
  }
}
