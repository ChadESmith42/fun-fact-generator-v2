import { Component, inject, OnDestroy, signal, WritableSignal } from '@angular/core';
import { FactService } from '../../services/fact.service';
import { map, Observable, Subject, takeUntil } from 'rxjs';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { Fact } from '../../models/fact';

@Component({
  selector: 'app-fact',
  standalone: true,
  imports: [
    AsyncPipe,
    JsonPipe,
  ],
  templateUrl: './fact.component.html',
  styleUrl: './fact.component.scss'
})
export class FactComponent implements OnDestroy {
  private _factService: FactService = inject(FactService);
  private _destroy$: Subject<boolean> = new Subject<boolean>();
  fact$: WritableSignal<string> = signal<string>('');
  currentFacts: string[] = [];

  ngOnDestroy(): void {
    this._destroy$.next(true);
    this._destroy$.unsubscribe();
  }

  getFact(): void {
    this._factService.getFact().pipe(takeUntil(this._destroy$)).subscribe({
      next: fact => {
        this.fact$.set(fact.factoid);
        this.currentFacts = [fact.factoid, ...this.currentFacts];
      },
      error: () => {
        this.fact$.set('Could not get a fact.');
      }
    });
  }

  addToFavorites(fact: string) {
    console.log(`Saving ${fact}`)
    this._factService.saveFact(fact).subscribe({
      next: response => console.log(response)
    });
  }

}
