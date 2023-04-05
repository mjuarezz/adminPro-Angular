import { Component } from '@angular/core';

import Swal from 'sweetalert2';

import { FileUploadService } from 'src/app/services/file-upload.service';
import { ModalImagenService } from '../../services/modal-imagen.service';

@Component({
  selector: 'app-modal-imagen',
  templateUrl: './modal-imagen.component.html',
  styles: [
  ]
})
export class ModalImagenComponent {

  public imagenSubir!: File;
  public imgTemp: any = null;
  public imgPorSubir = false;

  constructor(public modalImagenService: ModalImagenService,
              private fileUploadService: FileUploadService) {}


  cerrarModal() {
    this.imgTemp = null;
    this.imgPorSubir = false;
    this.modalImagenService.cerrarModal();
  }


  cambiarImagen( event : any ) {
    const file = event.target.files[0];
    this.imagenSubir = file;
    this.imgPorSubir = true;

    if ( !file ) { 
      this.imgTemp = null;
      this.imgPorSubir = false;
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL( file );

    reader.onloadend = () => {
      this.imgTemp = reader.result;
    }

  }


  subirImagen() {
    if( !this.imgPorSubir ) {
      return
    }

    const uid = this.modalImagenService.id;
    const tipo = this.modalImagenService.tipo;
    

    this.fileUploadService.actualizarFoto(
        this.imagenSubir,tipo, uid!)
      .then( img =>  {
          Swal.fire('Imagen actualizada','Cambios fueron guardados','success');
          
          this.modalImagenService.nuevaImagen.emit( img );

          this.cerrarModal();
      }, (err) => {
          Swal.fire('Error','No se pudo actualizar la imagen','error');
      });

  }  

}
