import { Injectable } from '@angular/core';
import {  CanActivate, CanLoad,  Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AuthService } from '../auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class TokenValidationGuard implements CanActivate, CanLoad {

  constructor(private authservice:AuthService,
              private router: Router){


              }

  canActivate(): Observable<boolean>| boolean {
    return this.authservice.tokenValidate()
      .pipe(
        tap(validate=>{
          if (!validate) {
            this.router.navigateByUrl('/auth/login')
          }
        }
        )
      );
  }
  canLoad(): Observable<boolean>| boolean  {
    return this.authservice.tokenValidate()
    .pipe(
      tap(validate=>{
        if (!validate) {
          this.router.navigateByUrl('/auth/login')
        }
      }
      )
    );
  }
}
