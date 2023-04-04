import { map } from "rxjs/operators";
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';

import { Usuario } from '../models/usuario.model';
import { CargarUsuarios } from '../interfaces/usuarios.interface';

@Injectable({
  providedIn: 'root'
})
export class BusquedasService {

  private urlApi : string = environment.urlApi;
  public usuario! : Usuario;

  get token(): string {
    return localStorage.getItem( 'token' ) || '';
  }

  get headers() {
    return { 
      headers: { 
        'x-token': this.token 
      } 
    }
  }


  constructor( private http : HttpClient ) { }


  transformarUsuarios( resultados: any[]): Usuario[] {

    return resultados.map( user => new Usuario(
      user.nombre,user.email,'',user.img,user.google,user.role,user.uid ));
  }


  buscar( criterio : string = '', tipo: 'usuarios' | 'medicos' | 'hospitales' ) {
    //http://localhost:3000/api/todo/coleccion/usuarios/lopez

    const urlAuth = `${this.urlApi}/todo/coleccion/${ tipo }/${ criterio }`
    return this.http.get<any[]>( urlAuth, this.headers )
      .pipe(
        map( ( resp: any) => {
          //resp.resultados 
          switch ( tipo ) {
            case 'usuarios':
              return this.transformarUsuarios(resp.resultados);
              break;
          
            default:
              return []
              break;
          }
        })
      );

  }
}
