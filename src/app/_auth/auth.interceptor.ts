import { HttpErrorResponse, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { UserAuthService } from '../services/user-auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  if (req.headers.get("No-Auth") === 'True') {
    const cloneReq = req.clone();
    return next(cloneReq);
  }
  const authService = inject(UserAuthService);
  const token = authService.getJwtToken();
  const router = inject(Router);

  if (token) {
    req = addToken(req, token);
  }
  
  return next(req).pipe(
    catchError(
        (err: HttpErrorResponse) => {
            console.log(err.status);
            if(err.status === 401) {
                router.navigate(['/login']);
            } else if (err.status === 403) {
                router.navigate(['/forbidden']);
            }
            return throwError("Something is wrong");
        }
    )
);
};
function addToken(request: HttpRequest<any>, token: string | null) {
  return request.clone(
    {
      setHeaders: {
          Authorization : `Bearer ${token}`
      }
  }
);
}

