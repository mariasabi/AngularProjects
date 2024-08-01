import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, throwError } from "rxjs";

@Injectable()
export class AuthInterceptor implements HttpInterceptor{
intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token=localStorage.getItem('authToken');
    const newCloneReq=req.clone({
            setHeaders:{Authorization:`Bearer ${token}`},
        })
        return next.handle(newCloneReq);
    /*
    return next.handle(newCloneReq).pipe(
        catchError((error: HttpErrorResponse) => {
            if (error.status === 401) {
              // Redirect to home URL on 401 Unauthorized error
              alert('Unauthorised access');
            }
            return throwError(error);
          })
        );*/
}
}