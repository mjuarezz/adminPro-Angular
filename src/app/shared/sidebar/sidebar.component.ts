import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SidebarService } from 'src/app/services/sidebar.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent {

  menuItems: any[];
  
  constructor( private sidebarservice: SidebarService,
               private usuarioService: UsuarioService,
               private router: Router ) {
    this.menuItems = sidebarservice.menu;

  }

  logout() {
    this.usuarioService.logout();
    this.router.navigateByUrl('/login');
  }

  get getUrlImg() {
    return this.usuarioService.usuario.imagenUrl;
  }


  get getNombre() {
    return this.usuarioService.usuario.nombre;
  }


}
