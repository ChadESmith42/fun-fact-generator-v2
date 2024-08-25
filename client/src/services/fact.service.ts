import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Fact } from '../models/fact';

@Injectable({
  providedIn: 'root'
})
export class FactService {
  private _http: HttpClient = inject(HttpClient);
  currentFactList: string[] = [];
  limit$: WritableSignal<number> = signal<number>(10);

  getFact(): Observable<Fact> {
    return this._http.get<Fact>('api/fact');
  }

  saveFact(fact: string): Observable<unknown> {
    return this._http.post('api/fact', { message: fact });
  }

  getPopular(limit: number): Observable<Fact[]> {
    return this._http.get<Fact[]>(`api/fact/popular?queryLimit=${limit}`);
  }

  getLatest(limit: number): Observable<Fact[]> {
    return this._http.get<Fact[]>(`api/fact/latest?queryLimit=${limit}`);
  }

  voteOnFact(fact: Fact, vote: 1 | -1): Observable<Fact> {
    const newVote = {
      ...fact,
      vote
    };
    console.log(newVote);
    return this._http.post<Fact>(`api/fact`, newVote);
  }
}
