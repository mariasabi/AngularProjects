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
    
}
}