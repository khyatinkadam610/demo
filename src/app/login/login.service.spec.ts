import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { User } from '../models/user.model';

import { AuthResponseData, LoginService } from './login.service';

describe('LoginService', () => {
  let authService: LoginService;
  let mockRoute:Router;
  let httpService: any;
  const user={
    email: "qd@gmail.com",
    id: 1,
    _token: "abcd",
    _tokenExpirationDate: "abcde"
}
    const httpResponse: AuthResponseData = {
        email: "qdr@gmail.com",
        localId: '1',
        idToken: 'firebase-response-id',
        kind: "httpResKind",
        refreshToken: "refreshToken1",
        expireIn:'3'

    }
  beforeEach(() => {
    mockRoute = jasmine.createSpyObj(['navigate']);
    httpService = jasmine.createSpyObj(['post']);
    httpService.post.and.returnValue(of(httpResponse));
    authService = new LoginService(httpService,mockRoute)
  });

  it('should be created', () => {
    expect(authService).toBeTruthy();
  });

  it('should log out',() =>{
    localStorage.setItem('userData',JSON.stringify(user));
    // console.log(localStorage.getItem('userData'));
    let data = localStorage.getItem('userData');
    expect(JSON.parse(data?data:"dummy")).toEqual(user);
    authService.logout();
    data = localStorage.getItem('userData');
    // console.log(localStorage.getItem('userData'));
    expect(data).toBeFalsy();
    expect(mockRoute.navigate).toHaveBeenCalledWith(['./login']);
  })

  describe("should Sign Up the User", () => {
    it("signUp", () => {
        let email = "qdr@gmail.com"
        let password = "qwerty"
        authService.signup(email, password).subscribe(
            data => expect(data).toEqual(httpResponse, 'should return sign Up Response'));
    })
})

describe("should make user Log In", () => {
    it("LogIn", () => {
        let email = "test12@gmail.com"
        let password = "123456"
        authService.login(email, password).subscribe(
            data => expect(data).toEqual(httpResponse, 'should return Login response'));
    })
})

describe("Handle Error", () => {
    it("handleError Invalid Password", () => {
        const errorRes = { error: { error: { message: "INVALID_PASSWORD" } } };
        let email = "qdr@gmail.com"
        let password = "qwerty"
        httpService.post.and.returnValue(throwError(errorRes));
        authService = new LoginService(httpService,mockRoute);
        authService.signup(email, password).subscribe({
            error: data => {
                expect(data).toEqual("Invalid Password");
            }
        })
    })
    it("handleError Email Not Found", () => {
        const errorRes = { error: { error: { message: "EMAIL_NOT_FOUND" } } };
        let email = "qdr@gmail.com"
        let password = "qwerty"
        httpService.post.and.returnValue(throwError(errorRes));
        authService = new LoginService(httpService,mockRoute);
        authService.signup(email, password).subscribe({
            error: data => {
                expect(data).toEqual("Email not found..no offense");
            }
        })
    })
    it("handleError Email Exists", () => {
        const errorRes = { error: { error: { message: "EMAIL_EXISTS" } } };
        let email = "qdr@gmail.com"
        let password = "qwerty"
        httpService.post.and.returnValue(throwError(errorRes));
        authService = new LoginService(httpService,mockRoute);
        authService.signup(email, password).subscribe({
            error: data => {
                expect(data).toEqual("This email address exists already ");
            }
        })
    })
    it("handleError unknown Error occured", () => {
        const errorRes = { error: { error:  ""  } };
        let email = "qdr@gmail.com"
        let password = "qwerty"
        httpService.post.and.returnValue(throwError(errorRes));
        authService = new LoginService(httpService,mockRoute);
        authService.signup(email, password).subscribe({
            error: data => {
                expect(data).toEqual("An unknown Error occured!");
            }
        })
    })
})

describe("AutoLogin",()=>{
    it("auto-login",()=>{
        const userData= {
            email: "qd@gmail.com",
            id: "1",
            _token: "tokenResponse",
            _tokenExpirationDate: "ExpirationDate"
        }
        localStorage.setItem('userData',JSON.stringify(userData));
        authService.autoLogin();
        expect(authService.user.value.email).toEqual(userData.email)
       
       
    })

    it("auto-login",()=>{
        // const userData= {}
        localStorage.setItem('userData','""');
        authService.autoLogin();
        // expect(authService.user.value.email).toBeFalsy();
       
       
    })
})
});
