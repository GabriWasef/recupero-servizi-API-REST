# Recupero servizi API REST

## Descrizione

L'applicazione Angular recupera e visualizza i todo tramite l'API di prova
[JSONPlaceholder](https://jsonplaceholder.typicode.com/todos). È possibile consultare
l'elenco, aprire il dettaglio di un todo e navigare tra gli elementi precedenti e
successivi.

## Come avviare

```bash
npm install
ng serve
ng build
```

Con `ng serve` l'app è disponibile su `http://localhost:4200/`.

## Struttura delle cartelle

- `src/app/models/`: contiene il modello `Todo`.
- `src/app/services/`: contiene `TodoService`, che comunica con l'API e gestisce
  caricamento, elenco, dettaglio ed errori.
- `src/app/pages/elenco/`: contiene la pagina con l'elenco dei todo.
- `src/app/pages/dettaglio/`: contiene la pagina del dettaglio e la navigazione
  tra gli id.

Il servizio usa signal privati per mantenere lo stato. I signal esposti ai
componenti sono ottenuti con `asReadonly()`, così i componenti possono leggerli
ma non modificarli. I valori derivati possono essere rappresentati con
`computed`, che ricalcola automaticamente il risultato quando cambiano i signal
da cui dipende.

## Membri del gruppo

| Nome | Username GitHub | Parte svolta | Strumento AI usato |
| --- | --- | --- | --- |
| Wasef | [USERNAME WASEF] | Base del progetto, servizio e routing | [STRUMENTO WASEF] |
| Franco | [USERNAME FRANCO] | Pagina elenco | [STRUMENTO FRANCO] |
| Villanueva | [USERNAME VILLANUEVA] | Pagina dettaglio e README | [STRUMENTO VILLANUEVA] |

## Nota su JSONPlaceholder

JSONPlaceholder non salva i dati creati con `POST`. Il nuovo elemento ha id `201`
e aprirne il dettaglio dà errore `404`. È un comportamento atteso del servizio
di prova.

## Strumenti usati

Ogni membro ha usato l'AI indicata nella tabella per scrivere la propria parte e
la spiega a voce in laboratorio:

- Wasef: [STRUMENTO WASEF]
- Franco: [STRUMENTO FRANCO]
- Villanueva: [STRUMENTO VILLANUEVA]