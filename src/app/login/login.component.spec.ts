import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { AppModule } from '../app.module';

import { LoginComponent } from './login.component';
import { LoginService } from './login.service';

describe('LoginComponent', () => {

  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let httpmock: HttpTestingController;
  let mockRouter: any;
  let mockLogin: any;
  
      mockRouter = jasmine.createSpyObj(['navigate']);
    mockLogin = jasmine.createSpyObj(['login', 'signup']);
    mockLogin.login.and.returnValue(of('response'))
    mockLogin.signup.and.returnValue(of('response'))
  beforeEach(async () => {
    await TestBed.configureTestingModule({
        declarations: [LoginComponent],
        imports: [HttpClientModule, FormsModule],
        providers: [
            { provide: LoginService, useValue: mockLogin },
            { provide: Router, useValue: mockRouter }
        ]
    })
        .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
});

it('should toggle login mode', () => {
    component.onSwitchMode();
    expect(component.isLoginMode).toBe(false);
});
describe("OnSubmit", () => {
    it("should submit form (If Case)", () => {

        component.isLoading = false;

        const form = jasmine.createSpyObj(['reset', 'value', 'valid']);
        form.value = {
            email: "qd@gmail.com",
            password: "qwerty"
        }
        form.valid = true;

        component.onSubmit(form);
        expect(component.isLoading).toBeFalsy()
    })
    it("should submit form (Else Case)", () => {

        component.isLoginMode = false;
        const form = jasmine.createSpyObj(['reset', 'value', 'valid']);
        form.value = {
            email: "qd@gmail.com",
            password: "qwerty"
        }
        form.valid = true;

        component.onSubmit(form);
        expect(component.isLoading).toBeFalsy()
    })
    it("should submit form (Error Case)", () => {

        component.isLoginMode = false;
        mockLogin.signup.and.returnValue(throwError("error"))
        const form = jasmine.createSpyObj(['reset', 'value', 'valid']);
        form.value = {
            email: "qd@gmail.com",
            password: "qwerty"
        }
        form.valid = true;

        component.onSubmit(form);
        expect(component.isLoading).toBeFalsy()
    })
    it("Invalid Form",()=>{
        const form = jasmine.createSpyObj(['reset', 'value', 'valid']);
        form.value = {
            email: "qd@gmail.com",
            password: "qwerty"
        }
        form.valid = false;
        component.onSubmit(form);
        expect(component.isLoading).toBeFalsy();
    })
})
// describe("clearForm", () => {
//     it("should clear Form", () => {
//         const form = jasmine.createSpyObj(['reset', 'value', 'valid']);
//         form.value = {
//             email: "qd@gmail.com",
//             password: "qwerty"
//         }
//         form.valid = false;
//         component.clearForm(form);
//         expect(form.reset).toHaveBeenCalled();
//     })
// })
});
// import { HttpClientModule } from '@angular/common/http';
// import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { FormsModule, NgForm } from '@angular/forms';
// import { Router } from '@angular/router';
// import { of, throwError } from 'rxjs';
// import { AppModule } from '../app.module';

// import { LoginComponent } from './login.component';
// import { LoginService } from './login.service';

// describe('LoginComponent', () => {

//   let component: LoginComponent;
//   let fixture: ComponentFixture<LoginComponent>;
//   let httpmock: HttpTestingController;
//   let mockRouter: any;
//   let mockLogin: any;
  
//   beforeEach(async () => {
//     mockRouter = jasmine.createSpyObj(['navigate']);
//     mockLogin = jasmine.createSpyObj(['login', 'signup']);
//     mockLogin.login.and.returnValue(of('response'))
//     mockLogin.signup.and.returnValue(of({email: 'qdr@gmail.com', localId: '1', idToken: 'firebase-response-id', kind: 'httpResKind', refreshToken: 'refreshToken1', expireIn: '3'}))
//     await TestBed.configureTestingModule({
//       declarations: [LoginComponent],
//       imports: [HttpClientTestingModule, FormsModule,
//       ],
//       providers: [{ provider: LoginService, useValue: mockLogin },
//       { provider: Router, useValue: mockRouter }]
//     })
//       .compileComponents();

//     fixture = TestBed.createComponent(LoginComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//     // pending();
//   });

//   it('Should switch mode correctly', () => {
//     const loginStatus = component.isLoginMode;
//     component.onSwitchMode();
//     expect(component.isLoginMode).not.toEqual(loginStatus);
//   })
//   it('should not be valid', () => {
//     component.onSubmit();
//     expect(component.form.valid).not.toBeTruthy();
//     let email = component.form.controls['email'];
//     email.setValue('randomstring');
//     expect(email.valid).not.toBeTruthy();
//     let pass = component.form.controls['password'];
//     pass.setValue('abc');
//     expect(pass.valid).not.toBeTruthy();
//     expect(component.form.valid).not.toBeTruthy();
    
    

//   });
//   it('should be valid', () => {
//     let email = component.form.controls['email'];
//     email.setValue('abc@gmail.com');
//     expect(email.valid).toBeTruthy();
//     let pass = component.form.controls['password'];
//     pass.setValue('qwerty');
//     expect(pass.valid).toBeTruthy();
//     expect(component.form.valid).toBeTruthy();
//   });


//   describe("OnSubmit", () => {
//     it("should submit form (If Case)", () => {

//       let email = component.form.controls['email'];
//       email.setValue('abc@gmail.com');
//       expect(email.valid).toBeTruthy();
//       let pass = component.form.controls['password'];
//       pass.setValue('qwerty');
//       component.isLoginMode = false;
//       component.onSubmit();
      
//       expect(component.isLoading).toBeTruthy()
//     })
//     it("should submit form (else Case)", () => {

//       let email = component.form.controls['email'];
//       email.setValue('bcd@gmail.com');
//       expect(email.valid).toBeTruthy();
//       let pass = component.form.controls['password'];
//       pass.setValue('qwerty');
//       component.isLoginMode = true;
//       component.onSubmit();
//       expect(component.isLoading).toBeFalsy()
//     })
// 8
//     it("should submit form (Error Case)", () => {

//       component.isLoginMode = false;
//       mockLogin.signup.and.returnValue(throwError("error"))
//       // const form = jasmine.createSpyObj(['reset', 'value', 'valid']);
//       let email = component.form.controls['email'];
//       email.setValue('bcd@gmail.com');
//       let pass = component.form.controls['password'];
//       pass.setValue('qwerty');
//       // component.form.valid = true;

//       component.onSubmit();
//       expect(component.isLoading).toBeFalsy()
//   })
//   })

//   // it('',()=>{
//   //   component.form.controls['email'].setValue('bcd@gmail.com');
//   //   component.form.controls['password'].setValue('Password');
//   //   component.onSubmit();
//   // })

// });


