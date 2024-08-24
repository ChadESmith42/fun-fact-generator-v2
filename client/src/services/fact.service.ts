import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Fact } from '../models/fact';

@Injectable({
  providedIn: 'root'
})
export class FactService {
  currentFactList: string[] = [];
  constructor(private _http: HttpClient) { }

  getFact(): Observable<Fact> {
    return this._http.get<Fact>('api/fact');
  }

  saveFact(fact: string): Observable<unknown> {
    return this._http.post('api/fact', { message: fact });
  }
}
