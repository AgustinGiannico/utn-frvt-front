import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}

  // Verifica si el usuario está autenticado mediante la existencia de la cookie 'jwt'
  isLoggedIn(): boolean {
    return document.cookie.includes('jwt='); // Comprueba si la cookie 'jwt' está presente
  }

  // Establece la cookie de autenticación con el nombre 'jwt'
  setAuthToken(token: string): void {
    document.cookie = `jwt=${token}; path=/;`;
  }

  // Elimina la cookie 'jwt' al cerrar sesión
  logout(): void {
    document.cookie = 'jwt=; Max-Age=0; path=/;';
  }
}
