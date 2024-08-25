import { Component, inject } from '@angular/core';
import { FactService } from '../../services/fact.service';
import { Observable, Subject, takeUntil } from 'rxjs';
import { Fact } from '../../models/fact';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-popular',
  standalone: true,
  imports: [
    AsyncPipe,
  ],
  templateUrl: './popular.component.html',
  styleUrl: './popular.component.scss'
})
export class PopularComponent {
  _destroy$: Subject<boolean> = new Subject<boolean>();
  _factService: FactService = inject(FactService);
  popularFacts$: Observable<Fact[]> = this.getPopularFacts();

  setQueryLimit(limit: number): void {
    this._factService.limit$.set(limit);
  }

  getPopularFacts(): Observable<Fact[]> {
    return this._factService.getPopular(this._factService.limit$());
  }

  voteOnFact(fact: Fact, vote: 1 | -1): void {
    this._factService.voteOnFact(fact, vote).pipe(takeUntil(this._destroy$)).subscribe({
      next: result => console.log(result)
    });
  }
}
