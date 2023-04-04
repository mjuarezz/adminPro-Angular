import { catchError, map, tap } from "rxjs/operators";
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { environment } from 'src/environments/environment';
import { LoginForm, RegisterForm } from '../interfaces/auth.interface';
import { CargarUsuarios, UsuarioDeleteResponse } from '../interfaces/usuarios.interface';

import { Usuario } from '../models/usuario.model';

declare const google : any;


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private urlApi : string = environment.urlApi;
  public usuario! : Usuario;

  constructor( private http : HttpClient ) { }

  get token(): string {
    return localStorage.getItem( 'token' ) || '';
  }

  get uid(): string {
    return this.usuario.uid || '';
  }

  get headers() {
    return { 
      headers: { 
        'x-token': this.token 
      } 
    }
  }


  logout() {
    localStorage.removeItem('token');

    google.accounts.id.revoke( 'mariela.juarez.zuniga@gmail.com', () => {
      console.log('cerrar session de google');
    })

  }

  validarToken( ) : Observable<boolean> {
    //const token = localStorage.getItem( 'token' ) || '';


    const urlAuth = `${this.urlApi}/login/renew`
    return this.http.get( urlAuth,  this.headers)
        .pipe(
          map( ( resp: any ) => {
            const { email, google, nombre, role, img, uid } = resp.usuario;
            this.usuario = new Usuario( nombre, email, '', img, google, role, uid );
            localStorage.setItem('token', resp.token);
            return true;
          }),
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

  actualizarPerfil( data: { nombre: string, email: string, role: string }) {

    data = {
      ...data,
      role: this.usuario.role!
    }
  
    const urlAuth = `${this.urlApi}/usuarios/${ this.uid }`
    return this.http.put( urlAuth, data, this.headers )
      .pipe(
        tap( ( resp: any ) => {
          localStorage.setItem('token', resp.token)
        })
      );    
  }


  cargarUsuarios( desde: number = 0 ) : Observable<CargarUsuarios>{
    const urlAuth = `${this.urlApi}/usuarios?desde=${ desde }`
    return this.http.get<CargarUsuarios>( urlAuth, this.headers )
        .pipe(
          map( resp => { 
            const usuarios = resp.usuarios.map( user => new Usuario(
              user.nombre,user.email,'',user.img,user.google,user.role,user.uid ));
            return {
              ok: resp.ok,
              total: resp.total,
              usuarios
            };
          })
        );    
  }

  eliminarUsuario( usuario : Usuario ): Observable<UsuarioDeleteResponse> {
    const urlAuth = `${this.urlApi}/usuarios/${ usuario.uid }`
    return this.http.delete<UsuarioDeleteResponse>( urlAuth, this.headers ); 

  }

  actualizarUsuario( data: Usuario ) {
  
    const urlAuth = `${this.urlApi}/usuarios/${ data.uid }`
    return this.http.put( urlAuth, data, this.headers );    
  }



}
