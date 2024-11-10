// auth/logout/logout.component.ts
import { Component } from '@angular/core';
import { LogoutService } from '../../services/logout.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent {

  constructor(
    private logoutService: LogoutService,
    private router: Router
  ) { }

  cerrarSesion() {
    this.logoutService.logout().subscribe({
      next: () => {
        // Redirige al usuario a la página de login después del logout exitoso
        this.router.navigate(['/login']);
      },
      error: (error) => {
        console.error('Error al cerrar sesión:', error);
      },
    });
  }
}
