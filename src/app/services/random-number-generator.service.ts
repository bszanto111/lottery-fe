import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RandomNumberGeneratorService {

  constructor(private http: HttpClient) { }

  getGeneratedRandomNumbers(length: number) {
    return this.http.get<number[]>('http://localhost:8080/api/random-number-generator/' + length);
  }
}
