import { Component, OnDestroy, OnInit } from '@angular/core';
import { delay } from 'rxjs/operators';

import Swal from 'sweetalert2';

import { BusquedasService } from 'src/app/services/busquedas.service';
import { ModalImagenService } from '../../../services/modal-imagen.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Usuario } from 'src/app/models/usuario.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: [
  ]
})
export class UsuariosComponent implements OnInit, OnDestroy {

  public totalRegistros: number = 0;
  public registros: Usuario[] = [];
  public registrosTmp : Usuario[] = [];

  public imgSubs!: Subscription;
  public desde = 0;
  public cargando: boolean = true;


 constructor( private usuarioService: UsuarioService,
              private busquedaService: BusquedasService,
              private modalImagenService: ModalImagenService ) {}


  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  ngOnInit(): void {
    this.cargarUsuarios();
    // Emitter para monitorear cuando en el modal cambie la imagen
    this.imgSubs = this.modalImagenService.nuevaImagen   
      .pipe( delay(100) ) // No mostraba la imagen
      .subscribe( img => {
          this.cargarUsuarios();
      })
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
    this.modalImagenService.abrirModal( 'usuarios', usuario.uid, usuario.img );

  }

}
