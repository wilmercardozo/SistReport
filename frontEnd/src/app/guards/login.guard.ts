import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenStorageService } from '../services/token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor(
    private router: Router,
    private token: TokenStorageService) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    
    const token =this.token.ObtenerCookie();
    if (token.length === 0 || token === undefined || token === null) {
      this.router.navigate(['/login']);
      return false;
    }
    
    // const rutasDisponibles = this.token.obtenerRutas();  
    // if(rutasDisponibles.indexOf(state.url) === -1 ) {
    //   this.router.navigate(['/login']);
    //   return false;
    // } 

    return true;
  }


}
