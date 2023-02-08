import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthResponseData, LoginService } from './login.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent {
    // @ViewChild("authForm")
    // public form!: NgForm;
    
    authObs?: Observable<AuthResponseData>;
    constructor(private authService: LoginService, private router: Router) { }

    error!: string;
    isLoginMode = true;
    isLoading = false;
    onSwitchMode() {
        this.isLoginMode = !this.isLoginMode;
    }

    onSubmit(form:NgForm) {
        // console.log(form.value);
        if (!form.valid) {
            return;
        }
        const email = form.value.email;
        const pass = form.value.password;
        console.log("Inside signup",email,pass);

        this.isLoading = true;
        if (this.isLoginMode) {
            this.authObs = this.authService.login(email, pass);
        }
        else {

            this.authObs = this.authService.signup(email, pass)
        }
        
        this.authObs.subscribe(
            response => {
                console.log(response,"inside authobs");
                this.isLoading = false;
                this.router.navigate(['/shop']);
            },
            (errorRes) => {
                console.log(errorRes,"inside authobs");
                console.log(errorRes);
                this.error = errorRes;
                this.isLoading = false;
            }
        );

        form.reset();
    }

}
