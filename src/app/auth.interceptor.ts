import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  let userDetails = localStorage.getItem('userDetails');
  if (userDetails) {
    const token = JSON.parse(userDetails).token;
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  } else {
    router.navigate(['/login']);
  }

  return next(req);
};
