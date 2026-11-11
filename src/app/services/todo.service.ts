import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';

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
    this._caricamento.set(true);
    this._errore.set(null);

    this.http.get<Todo[]>(this.url).subscribe({
      next: (dati) => {
        this._todos.set(dati);
        this._caricamento.set(false);
      },
      error: (e: HttpErrorResponse) => {
        this._errore.set(this.messaggioErrore(e));
        this._caricamento.set(false);
      },
    });
  }

  caricaElemento(id: number): void {
    this._elemento.set(null);
    this._caricamento.set(true);
    this._errore.set(null);

    this.http.get<Todo>(`${this.url}/${id}`).subscribe({
      next: (dato) => {
        this._elemento.set(dato);
        this._caricamento.set(false);
      },
      error: (e: HttpErrorResponse) => {
        this._errore.set(this.messaggioErrore(e));
        this._caricamento.set(false);
      },
    });
  }

  creaTodo(dati: { userId: number; title: string; completed: boolean }): void {
    this.http.post<Todo>(this.url, dati).subscribe({
      // JSONPlaceholder non salva davvero i dati e risponde sempre con id 201:
      // aggiungiamo la risposta in testa all'elenco solo in locale.
      next: (creato) => this._todos.update((lista) => [creato, ...lista]),
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
