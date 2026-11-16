import { Component, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-dettaglio',
  imports: [RouterLink],
  templateUrl: './dettaglio.html',
  styleUrl: './dettaglio.css',
})
export class Dettaglio {
  protected readonly servizio = inject(TodoService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  protected id = 1;

  constructor() {
    this.route.paramMap.pipe(takeUntilDestroyed()).subscribe((parametri) => {
      const id = Number(parametri.get('id'));

      if (Number.isInteger(id) && id > 0) {
        // Il componente resta lo stesso quando cambia l'id della rotta.
        this.id = id;
        this.servizio.caricaElemento(id);
      }
    });
  }

  protected vaiA(id: number): void {
    // I pulsanti cambiano l'id mantenendo il componente di dettaglio.
    void this.router.navigate(['/risorsa', id]);
  }
}
