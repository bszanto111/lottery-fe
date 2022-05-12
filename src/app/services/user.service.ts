import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  async getUsers(): Promise<User[]> {
    const usersResponse = await this.http.get('http://localhost:8080/api/user').toPromise();
    return <User[]>usersResponse;
  }
}
