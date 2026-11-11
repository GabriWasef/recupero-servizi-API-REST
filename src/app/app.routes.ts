import { Routes } from '@angular/router';

import { Dettaglio } from './pages/dettaglio/dettaglio';
import { Elenco } from './pages/elenco/elenco';

export const routes: Routes = [
  { path: '', redirectTo: '/elenco', pathMatch: 'full' },
  { path: 'elenco', component: Elenco },
  { path: 'risorsa/:id', component: Dettaglio },
  { path: '**', redirectTo: '/elenco' },
];
