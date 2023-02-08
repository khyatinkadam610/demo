import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, tap, throwError } from 'rxjs';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { User } from '../models/user.model';
export interface AuthResponseData {
  kind: string,
  idToken: string,
  email: string,
  refreshToken: string,
  expireIn: string,
  localId: string,
  registered?: boolean
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  
  user = new BehaviorSubject<User>({} as User);
  // user = new Subject<User>();
  currentUser!:any;
  constructor(private http: HttpClient, private router:Router) {
    // console.log(this.user.value.email);
    
  }
  
  login(email: string, pass: string) {
    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDAbjd82jNfXq2mgqozv3iImAv5VFGtSCo',
        {
            email: email,
            password: pass,
            returnSecureToken: true
        })
        .pipe(catchError(this.handleError),tap(
            resData =>{
                console.log("yohohoho",resData);
                this.handleAuthentication(resData.email,resData.localId,resData.idToken)
            }
        ))
}

private handleAuthentication(email:string, userId:string, token:string) {
  // console.log("Insider auth ",email, token);
  const user = new User(
      email,
      userId, 
      token,          
  )
  this.user.next(user);
  this.currentUser = user;
  localStorage.setItem('userData',JSON.stringify(user));
}

  signup(email: string, password: string) {
    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDAbjd82jNfXq2mgqozv3iImAv5VFGtSCo'
        , {
            email: email,
            password: password,
            returnSecureToken: true
        })
        .pipe(catchError(this.handleError))
}
private handleError(errorRes: HttpErrorResponse) {
  let errorMsg = 'An unknown Error occured!';
  if (!errorRes.error || !errorRes.error.error) {
      return throwError(errorMsg);
  }
  switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
          errorMsg = "This email address exists already "
          break;
      case 'INVALID_PASSWORD':
          errorMsg = "Invalid Password"
          break;
      case 'EMAIL_NOT_FOUND':
          errorMsg = "Email not found..no offense"
  }
  return throwError(errorMsg);
}


logout(){
  this.user.next({} as User);
  this.router.navigate(['./login']);
  localStorage.removeItem('userData');
}

autoLogin()
{
    let data = localStorage.getItem('userData');
    const userData:{
        email:string;
        id:string;
        _token:string;
        _tokenExpirationDate:string;
    } = JSON.parse(data?data:'');
    if (!userData) {
        return;
    }

    const loadedUser = new User(userData.email,userData.id, userData._token)
    
    
    if(loadedUser.token){
        // console.log(loadedUser);
        this.user.next(loadedUser);
        // this.router.navigate(['/shop'])
    }
}
}

