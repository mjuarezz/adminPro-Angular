import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: [
  ]
})
export class PromesasComponent implements OnInit{
  
  /*
  ngOnInit(): void {
    const promesa = new Promise( (resolve, reject) => {
      if( false ) {
        resolve('Hola Mundo!');
      }
      else {
        reject('algo salio mal');
      }
    });

    promesa.then( (mensaje) => {
      console.log('Hey termine!', mensaje)
    })
    .catch( error => console.log('Error: en la promesa',error))
    console.log('fin del OnInit');
  }
  */

  ngOnInit(): void {
    //this.getUsuarios();

    this.getUsuarios().then(usuarios => {
      console.log(usuarios);
    });
  }


  getUsuarios() {
    return new Promise( resolve => {
      fetch('https://reqres.in/api/users')
        .then( resp => resp.json() )
        .then( body => resolve( body.data ))
    } );
  }
} 


