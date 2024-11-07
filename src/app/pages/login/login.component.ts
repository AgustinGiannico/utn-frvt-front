import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EnviarDatosService } from '../../auth/enviar-datos.service';
import { emailPattern, passwordPattern } from 'src/app/auth/validators/validators';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  providers: [EnviarDatosService],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  formLogin: FormGroup;


  constructor(
    private formbuilder: FormBuilder, 
    private enviarDatosServicio: EnviarDatosService,
    private router: Router,
    private cookieService: CookieService
  ) {

    //FORMULARIO
    this.formLogin = this.formbuilder.group({

      email: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(40), Validators.pattern(emailPattern)]],

      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(30), Validators.pattern(passwordPattern)]],

    });

  }


  enviarDatos() {
    if (this.formLogin.valid) {
      this.enviarDatosServicio.enviarFormularioLogin(this.formLogin.value).subscribe({
        next: (response) => {
          if (response.token) {
            // Calcula la fecha de expiración para 1 hora después del momento actual
            const expireDate = new Date();
            expireDate.setHours(expireDate.getHours() + 1);
            
            // Guarda el token en una cookie que expirará en 1 hora
            this.cookieService.set('jwt', response.token, { expires: expireDate, secure: false, sameSite: 'Lax' });
          }

          // Redirige al home tras un inicio de sesión exitoso
          this.router.navigate(['/']);
        },
        error: (error) => {
          console.warn(error);
        },
        complete: () => {
          console.info('Enviado con éxito.');
        },
      });
    } else {
      console.warn('Datos no enviados, verifique los requisitos o contacte al administrador.');
    }
  }
}
