import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

import { TodoService } from '../../services/todo.service';

type Filtro = 'tutti' | 'completati' | 'da-fare';

@Component({
  selector: 'app-elenco',
  imports: [RouterLink, FormsModule],
  templateUrl: './elenco.html',
  styleUrl: './elenco.css',
})
export class Elenco implements OnInit {
  // Il servizio contiene i dati (signal): il componente li legge soltanto
  servizio = inject(TodoService);

  // Filtro scelto dall'utente: cambia quando si clicca un pulsante
  filtro = signal<Filtro>('tutti');

  // computed: si ricalcola da solo quando cambia il filtro o l'elenco nel servizio
  visibili = computed(() => {
    const lista = this.servizio.todos();
    switch (this.filtro()) {
      case 'completati':
        return lista.filter((t) => t.completed);
      case 'da-fare':
        return lista.filter((t) => !t.completed);
      default:
        return lista;
    }
  });

  // Conteggi mostrati in pagina, sempre calcolati sull'elenco completo
  totale = computed(() => this.servizio.todos().length);
  completati = computed(() => this.servizio.todos().filter((t) => t.completed).length);
  daFare = computed(() => this.totale() - this.completati());

  // Campi del form di creazione (collegati con ngModel)
  nuovoTitolo = '';
  nuovoCompletato = false;

  ngOnInit(): void {
    this.servizio.caricaElenco();
  }

  creaTodo(): void {
    const titolo = this.nuovoTitolo.trim();
    // Non invia se il titolo è vuoto
    if (titolo === '') {
      return;
    }
    // userId fisso a 1
    this.servizio.creaTodo({ userId: 1, title: titolo, completed: this.nuovoCompletato });
    // Svuota il form
    this.nuovoTitolo = '';
    this.nuovoCompletato = false;
  }

  impostaFiltro(valore: Filtro): void {
    this.filtro.set(valore);
  }
}
