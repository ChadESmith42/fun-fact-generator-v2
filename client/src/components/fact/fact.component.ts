import { Component, inject } from '@angular/core';
import { FactService } from '../../services/fact.service';
import { Observable } from 'rxjs';
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
export class FactComponent {
  private _factService: FactService = inject(FactService);
  fact$: Observable<Fact> = this.getFact();

  getFact(): Observable<Fact> {
    return this._factService.getFact();
  }
}
