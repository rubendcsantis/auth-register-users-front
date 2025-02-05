import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

export const validateTokenInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);  // Inyectar Router manualmente
  return next(req).pipe(
    catchError((error) => {
      if (error.status === 401) {
        router.navigate(['/login']);  // Redirigir al login en caso de 401
      }
      return throwError(() => error);
    })
  );
};

