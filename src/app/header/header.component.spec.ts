import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { HeaderComponent } from './header.component';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { ProductService } from '../shopping-kart/product.service';
import { LoginService } from '../login/login.service';
import { AppComponent } from '../app.component';
import { AppModule } from '../app.module';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AppRoutingModule } from '../app-routing.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let el: DebugElement;
  let productSpy: any;
  let loginSpy: any;
  let formspy:any;
  
  beforeEach(async () => {
    productSpy = jasmine.createSpyObj('ProductService', ['setProduct']);
    loginSpy = jasmine.createSpyObj('LoginService', ['logout']);
    formspy = jasmine.createSpyObj('form',['reset']);
    await TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      imports: [FormsModule,ReactiveFormsModule,HttpClientTestingModule,AppRoutingModule,FontAwesomeModule
        
      ],
      //   providers:[{provide:ProductService , useValue:productSpy},
      //     {provide:LoginService , useValue:loginSpy}]
    })
      .compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;
    fixture.detectChanges();

  });

  it('Logout Button should exist', () => {
    component.isAuthenticated = true;
    fixture.detectChanges();
    const button = el.query(By.css('.btn-secondary'));
    expect(button).toBeTruthy('Nope button is not there');
  })

  it('Ater Logout isAuthenticated should be failed', () => {
    component.onLogOut();
    expect(component.isAuthenticated).toBeFalse();
  }
  )

  it('Search', () => {
    const testForm = <NgForm>{
      value: {
          search:'naruto',
      },
      reset:function(){ return jasmine.createSpyObj(['reset']);}
  };
    component.search(testForm);
    expect(testForm.reset).toBeTruthy();    
  })
  it('Search empty', () => {
    const testForm = <NgForm>{
      value: {
          search:'',
      },
      reset:function(){ return jasmine.createSpyObj(['reset']);}
  };
    component.search(testForm);
    expect(testForm.reset).toBeTruthy();  
  })
});
