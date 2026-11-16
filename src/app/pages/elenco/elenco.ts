import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-elenco',
  imports: [RouterLink],
  templateUrl: './elenco.html',
  styleUrl: './elenco.css',
})
export class Elenco implements OnInit {
  // Il servizio contiene i dati (signal): il componente li legge soltanto
  servizio = inject(TodoService);

  ngOnInit(): void {
    this.servizio.caricaElenco();
  }
}
