import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: 'fact', loadComponent: () => import('../components/fact/fact.component').then(c => c.FactComponent) },
  { path: 'popular', loadComponent: () => import('../components/popular/popular.component').then(c => c.PopularComponent) },
  { path: 'login', loadComponent: () => import('../components/login/login.component').then(c => c.LoginComponent) },
];
