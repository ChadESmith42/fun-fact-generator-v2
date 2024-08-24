import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: 'fact', loadComponent: () => import('../components/fact/fact.component').then(c => c.FactComponent) },
];
