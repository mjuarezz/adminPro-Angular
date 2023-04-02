import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, tap } from "rxjs/operators";

import { environment } from 'src/environments/environment';
import { LoginForm, RegisterForm } from '../interfaces/auth.interface';
import { Observable, of } from 'rxjs';

declare const google : any;


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private urlApi : string = environment.urlApi;

  constructor( private http : HttpClient ) { }


  logout() {
    localStorage.removeItem('token');

    google.accounts.id.revoke( 'mariela.juarez.zuniga@gmail.com', () => {
      console.log('cerrar session de google');
    })

  }

  validarToken( ) : Observable<boolean> {
    const token = localStorage.getItem( 'token' ) || '';

    const urlAuth = `${this.urlApi}/login/renew`
    return this.http.get( urlAuth,  { headers: { 'x-token': token } })
        .pipe(
          tap( ( resp: any ) => {
            localStorage.setItem('token', resp.token)
          }),
          map( resp => true ),
          catchError( error => of( false ) )

        );
    

  }

  crearUsuario( formData: RegisterForm ) {
  
    const urlAuth = `${this.urlApi}/usuarios/`
    return this.http.post( urlAuth, formData )
        .pipe(
          tap( ( resp: any ) => {
            localStorage.setItem('token', resp.token)
          })
        );
  }

  login( formData: LoginForm ) {
  
    const urlAuth = `${this.urlApi}/login`
    return this.http.post( urlAuth, formData )
      .pipe(
        tap( ( resp: any ) => {
          localStorage.setItem('token', resp.token)
        })
      );
  }


  loginGoogle( token: string ){
  
    const urlAuth = `${this.urlApi}/login/google`
    return this.http.post( urlAuth, { token } )
      .pipe(
        tap( ( resp: any ) => {
          localStorage.setItem('token', resp.token)
        })
      );
  }

}
