import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { Observable, finalize } from 'rxjs';

import { Todo } from '../models/todo';

@Injectable({ providedIn: 'root' })
export class TodoService {
  private http = inject(HttpClient);
  private url = 'https://jsonplaceholder.typicode.com/todos';

  // Signal privati: solo il servizio può modificarli
  private _todos = signal<Todo[]>([]);
  private _elemento = signal<Todo | null>(null);
  private _caricamento = signal(false);
  private _errore = signal<string | null>(null);

  // Esposti in sola lettura con asReadonly(): i componenti possono solo leggerli
  todos = this._todos.asReadonly();
  elemento = this._elemento.asReadonly();
  caricamento = this._caricamento.asReadonly();
  errore = this._errore.asReadonly();

  caricaElenco(): void {
    this.carica(this.http.get<Todo[]>(this.url), (dati) => this._todos.set(dati));
  }

  caricaElemento(id: number): void {
    this._elemento.set(null);
    this.carica(this.http.get<Todo>(`${this.url}/${id}`), (dato) => this._elemento.set(dato));
  }

  creaTodo(dati: Omit<Todo, 'id'>): void {
    this.http.post<Todo>(this.url, dati).subscribe({
      // JSONPlaceholder non salva davvero i dati e risponde sempre con id 201:
      // aggiungiamo la risposta in testa all'elenco solo in locale.
      next: (creato) => this._todos.update((lista) => [creato, ...lista]),
      error: (e: HttpErrorResponse) => this._errore.set(this.messaggioErrore(e)),
    });
  }

  // Gestione comune di caricamento ed errore per le richieste di lettura
  private carica<T>(richiesta: Observable<T>, alSuccesso: (dati: T) => void): void {
    this._caricamento.set(true);
    this._errore.set(null);

    richiesta.pipe(finalize(() => this._caricamento.set(false))).subscribe({
      next: alSuccesso,
      error: (e: HttpErrorResponse) => this._errore.set(this.messaggioErrore(e)),
    });
  }

  // Gestione errori: converte l'errore HTTP in un messaggio leggibile
  private messaggioErrore(e: HttpErrorResponse): string {
    if (e.status === 0) {
      return 'Rete assente: impossibile contattare il server. Controlla la connessione.';
    }
    if (e.status === 404) {
      return "Elemento non trovato: l'id richiesto non esiste (404).";
    }
    return `Errore del server (codice ${e.status}).`;
  }
}
