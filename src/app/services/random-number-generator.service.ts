import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RandomNumberGeneratorService {

  constructor(private http: HttpClient) { }

  async getGeneratedRandomNumbers(length: number): Promise<Set<number>> {
    const numbersResponse = await this.http.get('http://localhost:8080/api/random-number-generator/' + length).toPromise();
    return new Set<number>(<number[]>numbersResponse);
  }
}
