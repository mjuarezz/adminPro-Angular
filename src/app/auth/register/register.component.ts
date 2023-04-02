import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import Swal from 'sweetalert2'

import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  public formSubmitted: boolean = false;

  miFormulario: FormGroup = this.fb.group({
    nombre: ['test16',[Validators.required, Validators.minLength(3)]],
    email: ['test16@test.com',[Validators.required, Validators.email]],
    password: ['123456',[Validators.required]],
    password2: ['123456',[Validators.required]],
    terminos: [,[Validators.required]],
  },{
    validators: this.passwordsIguales('password','password2')
  });

  constructor( private router: Router,
               private fb: FormBuilder,
               private usuarioService: UsuarioService) {

  }

  crearUsuario() {
    this.formSubmitted = true;
  
    if( this.miFormulario.invalid) {
      return
    }
    
    this.usuarioService.crearUsuario(this.miFormulario.value)
      .subscribe(resp => {
        console.log('Usuario creado');
        // navegar al dashboard
        this.router.navigateByUrl('/')
      }, (err) => {
        Swal.fire('Error',err.error.msg, 'error');

      });


  }

  esCampoValido(campo : string) {

    return this.miFormulario.controls[campo].invalid &&
           this.formSubmitted? true: false;

  }

  aceptaTerminos() {
    return !this.miFormulario.get('terminos')?.value &&
           this.formSubmitted;
  }

  passwordsInvalidos(): boolean {
    const pass1 = this.miFormulario.get('password')?.value;
    const pass2 = this.miFormulario.get('password2')?.value

    return pass1 !== pass2 && 
           this.formSubmitted;
  }

  passwordsIguales( pass1Name: string, pass2Name: string ) {
    return ( formGroup: FormGroup ) => {
      const pass1Control = formGroup.controls[ pass1Name ];
      const pass2Control = formGroup.controls[ pass2Name ];
      if( pass1Control.value === pass2Control.value ) {
        pass2Control.setErrors(null)
      }
      else {
        pass2Control.setErrors({ noEsIgual: true });
      }

    }
  }

}
