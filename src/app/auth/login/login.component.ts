import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import Swal from 'sweetalert2'

import { UsuarioService } from 'src/app/services/usuario.service';

declare const google: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements AfterViewInit{

  @ViewChild('googleBtn') googleBtn!: ElementRef;

  miFormulario: FormGroup = this.fb.group({
    email: [localStorage.getItem('email') || '',[Validators.required, Validators.email]],
    password: ['',[Validators.required]],
    remember: [false]
  });

  constructor( private router: Router,
               private fb: FormBuilder,
               private usuarioService: UsuarioService) {}

  ngAfterViewInit(): void {
    
    this.googleInit();

  }

  googleInit() {
    google.accounts.id.initialize({
      client_id: "491629581359-d1bjq5f7ehb9v2pskmqdq6tp5k9r3lc4.apps.googleusercontent.com",
      callback: ( response: any ) => this.handleCredentialResponse( response )
    });
    google.accounts.id.renderButton(
      this.googleBtn.nativeElement,
      { theme: "outline", size: "large" }  // customization attributes
    );
  }

  handleCredentialResponse( response: any ) {
    //console.log("Encoded JWT ID token: " + response.credential);
    this.usuarioService.loginGoogle( response.credential )
      .subscribe(resp => {
        // navegar al dashboard
        this.router.navigateByUrl('/')
      })
  }

  login() {
    //this.router.navigateByUrl('/')
  
    if( this.miFormulario.invalid) {
      return
    }
    
    this.usuarioService.login(this.miFormulario.value)
      .subscribe(resp => {
        if( this.miFormulario.get('remember')?.value ) {
          localStorage.setItem('email',this.miFormulario.get('email')?.value);
        }
        else {
          localStorage.removeItem('email');
        }
        this.router.navigateByUrl('/');
      }, (err) => {
        Swal.fire('Error',err.error.msg, 'error');

      });

  }

}
