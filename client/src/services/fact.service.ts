import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Fact } from '../models/fact';

@Injectable({
  providedIn: 'root'
})
export class FactService {

  constructor(private _http: HttpClient) { }

  getFact(): Observable<Fact> {
    return this._http.get<Fact>('api/fact');
  }
}
