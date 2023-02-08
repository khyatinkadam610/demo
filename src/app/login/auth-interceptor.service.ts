import { HttpEvent, HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { exhaustMap, take } from "rxjs/operators";
import { LoginService } from "./login.service";


@Injectable()
export class AuthInterceptorService implements HttpInterceptor{
    constructor(private loginService:LoginService){}
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return this.loginService.user.pipe(
            take(1),exhaustMap(user =>{
                if(!user)
                {
                     return next.handle(req);
                }
                const modifiedReq = req.clone({params: new HttpParams().set('auth',user.token?user.token:"")});
                return next.handle(modifiedReq);
            })
        );
        
    }
}