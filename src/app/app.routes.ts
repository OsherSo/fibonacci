import { Routes } from '@angular/router';
import { FibonacciComponent } from './fibonacci/fibonacci.component';

export const routes: Routes = [
  { path: 'fibonacci/:index', component: FibonacciComponent },
  { path: '', redirectTo: '/fibonacci/1', pathMatch: 'full' },
  { path: '**', redirectTo: '/fibonacci/1' },
];
