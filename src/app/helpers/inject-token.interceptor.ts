import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginService } from '../auth/services/login.service';

@Injectable()
export class InjectTokenInterceptor implements HttpInterceptor {

  constructor(private authService : LoginService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
  const token = this.authService.getToken();
  const authReq = request.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`
    }
  });
  return next.handle(authReq);
}

}
