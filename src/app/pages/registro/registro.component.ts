import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EnviarDatosService } from '../../auth/enviar-datos.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {
  formRegistro: FormGroup;
  message: string = ''; // Inicializa como cadena vacía

  constructor(
    private formBuilder: FormBuilder,
    private enviarDatosServicio: EnviarDatosService,
    private router: Router,
    private cookieService: CookieService
  ) {
    this.formRegistro = this.formBuilder.group({
      username: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  enviarDatos() {
    if (this.formRegistro.valid) {
      this.enviarDatosServicio.enviarFormularioRegistro(this.formRegistro.value).subscribe({
        next: (response) => {
          console.log('Usuario registrado:', response);
          this.message = response.message || 'Registro exitoso';
          if (response['success']) {
            this.router.navigate(['/']);
          }
        },
        error: (error) => {
          console.error('Error al registrar el usuario:', error);
          this.message = error.status === 401 ? 'No se pudo autenticar el usuario.' : error.error?.error || 'Error al registrar el usuario';
        },
        complete: () => {
          console.info('Registro enviado con éxito.');
        },
      });
    } else {
      this.message = 'Complete todos los campos correctamente.';
      console.warn('Datos no enviados, verifique los requisitos o contacte al administrador.');
    }
  }
}
