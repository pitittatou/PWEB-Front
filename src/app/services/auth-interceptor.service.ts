import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse } from "@angular/common/http";
import { SocialAuthService } from "angularx-social-login";
import { catchError, throwError, Observable } from "rxjs";

export class AuthInterceptorService implements HttpInterceptor {
  constructor(private authService: SocialAuthService) {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.authService.authState.subscribe((user) => {
        return user.idToken
      }
    );

    if (token) {
      // If we have a token, we set it to the header
      request = request.clone({
        setHeaders: {Authorization: `Authorization token ${token}`}
      });
    }
    return next.handle(request)
  }
}
