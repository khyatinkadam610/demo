import { Injectable } from "@angular/core";
import {  CanActivate, Router, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { LoginService } from "./login.service";


@Injectable({providedIn:'root'})
export class AuthGuardService implements CanActivate{
    constructor(private authService:LoginService, private router:Router) {
        
    }
    canActivate(): UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        return this.authService.user.pipe(map(user =>{
            const isAuth = user.email?true:false;
        console.log(isAuth);
        
            if(isAuth)
            {
                return true;
            }
            return this.router.createUrlTree(['./login']);
        }))
    }


}