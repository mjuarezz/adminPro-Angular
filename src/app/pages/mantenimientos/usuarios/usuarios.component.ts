import { Component, OnInit } from '@angular/core';

import Swal from 'sweetalert2';

import { BusquedasService } from 'src/app/services/busquedas.service';
import { ModalImagenService } from '../../../services/modal-imagen.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Usuario } from 'src/app/models/usuario.model';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: [
  ]
})
export class UsuariosComponent implements OnInit{

  public totalRegistros: number = 0;
  public registros: Usuario[] = [];
  public registrosTmp : Usuario[] = [];
  public desde = 0;
  public cargando: boolean = true;

 constructor( private usuarioService: UsuarioService,
              private busquedaService: BusquedasService,
              private modalImagenService: ModalImagenService ) {}
  ngOnInit(): void {
    this.cargarUsuarios();
  }

  cambiarPagina( valor: number ) {
    this.desde += valor;
    if( this.desde < 0 ) {
      this.desde = 0;
    }
    else if (this.desde > this.totalRegistros) {
      this.desde -= valor;
    }
    this.cargarUsuarios()

  }

  cargarUsuarios() {
    this.cargando = true;
    this.usuarioService.cargarUsuarios( this.desde )
    .subscribe( ( { total, usuarios } ) => {
      this.totalRegistros = total;
      if(usuarios.length !== 0) {
        this.registros = usuarios;
        this.registrosTmp = usuarios;
      }
      this.cargando = false;
    });

  }



  buscar( criterio: string ) {
    if( criterio.length === 0 ) {
      this.registros = [...this.registrosTmp];
      return
    }
    this.busquedaService.buscar(criterio,'usuarios')
      .subscribe( resultados => {
        this.registros =  resultados;
      })
  }


  eliminarUsuario( usuario: Usuario ) {

    if(usuario.uid === this.usuarioService.uid) {
      Swal.fire('Error', 'No es posible borrar este usuario','error');
      return;
    }

    Swal.fire({
      title: '¿Borrar usuario?',
      text: `Esta a punto de borrar a ${ usuario.nombre }`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, Borrarlo'
    }).then((result) => {
      if (result.isConfirmed) {
        this.usuarioService.eliminarUsuario( usuario )
          .subscribe( ( { ok, msg } ) => {
              console.log( ok, msg );
            if( ok ) {
              this.cargarUsuarios();
               Swal.fire(
                'Usuario eliminado',
                `El usuario ${usuario.nombre} ha sido eliminado.`,
                'success'
              );              
            }
            else {
              Swal.fire(
                'No se pudo eliminar al usuario',
                `El usuario ${usuario.nombre} no ha sido eliminado.`,
                'error'
              )
            }
          });
      }
    })
  }

  cambiarRole( usuario: Usuario ) {
    this.usuarioService.actualizarUsuario( usuario )
      .subscribe( resp => {
        console.log( resp );

      })
  }


  abrirModal( usuario : Usuario ) {
    console.log(usuario);
    this.modalImagenService.abrirModal();

  }

}
