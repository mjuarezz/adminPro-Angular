import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import Swal from 'sweetalert2';

import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario.model';
import { FileUploadService } from 'src/app/services/file-upload.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styles: [
  ]
})
export class PerfilComponent implements OnInit{

  public usuario: Usuario;
  public miFormulario!: FormGroup;
  public imagenSubir!: File;
  public imgTemp: any = null;
  public imgPorSubir = false;

  constructor( private fb: FormBuilder,
               private usuarioService: UsuarioService,
               private fileUploadService: FileUploadService) {
    this.usuario = usuarioService.usuario;
  }
  
  ngOnInit(): void {

    this.miFormulario = this.fb.group({
      nombre: [this.usuario.nombre,[Validators.required, Validators.minLength(3)]],
      email: [this.usuario.email,[Validators.required, Validators.email]]
    });
    
  }

  actualizarPerfil() {
    this.usuarioService.actualizarPerfil(this.miFormulario.value)
      .subscribe( resp => {
        const { nombre, email } = this.miFormulario.value;
        this.usuario.nombre = nombre;
        this.usuario.email = email;

        Swal.fire('Guardado','Cambios fueron guardados','success');

      }, (err) => {
        Swal.fire('Error',err.error.msg,'error');
      });
  }

  cambiarImagen( event : any ) {
    const file = event.target.files[0];
    this.imagenSubir = file;
    this.imgPorSubir = true;

    if ( !file ) { 
      this.imgTemp = null;
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL( file );

    reader.onloadend = () => {
      this.imgTemp = reader.result;
    }

  }

  subirImagen() {
    this.fileUploadService.actualizarFoto(
        this.imagenSubir,
        'usuarios', 
        this.usuario.uid!)
      .then( img =>  {
          this.usuario.img = img;
          Swal.fire('Imagen actualizada','Cambios fueron guardados','success');
          this.imgPorSubir = false
      }, (err) => {
          Swal.fire('Error','No se pudo actualizar la imagen','error');
      });

  }



}
