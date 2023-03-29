import { Component, OnDestroy } from '@angular/core';
import { Observable, interval, Subscription } from 'rxjs';
import { retry, take, map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [
  ]
})
export class RxjsComponent implements OnDestroy {

  public intervalSubs: Subscription;

  constructor() {
    this.intervalSubs = this.retornaIntervalo()
      .subscribe( console.log )
      
  }

  ngOnDestroy(): void {
    this.intervalSubs.unsubscribe();
  }
  
  retornaIntervalo() : Observable<number> {
    return interval(100)
            .pipe(
              // take(10),
              map( valor => valor + 1),
              filter( valor => valor % 2 === 0 ),
            );

            // valor % 2 === 0 -> es un numero par
  } 


  /*   
  retornaIntervalo() : Observable<string> {
    return interval(500)
            .pipe(
              take(10),
              map( valor => `Hola Mundo ${ valor + 1}`)
            );
  } */

  /* 
  // Uso simple de observable
  constructor() {
    this.retornaObservable()
    .pipe(
      retry()
    ).subscribe({
      next: ( valor ) => console.log('Subs:',valor),
      error: ( error )=> console.warn('Error:',error),
      complete: () => console.info('Obs Terminado') 
    });
  }


  retornaObservable(): Observable<number> {
    let i = 0;
    
    const obs$ = new Observable<number>( observer => {
      const intervalo = setInterval( () => {
        i++;
        observer.next(i);
        if( i === 4 ) {
          clearInterval( intervalo );
          observer.complete();
        }
        if( i === 2 ) {
          console.log('lleog a 2');
          observer.error('i llego al valor de 2');
        }
      }, 1000 )
    } );
    return obs$;
  }
  */

}
