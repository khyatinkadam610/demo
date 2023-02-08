import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from '../app-routing.module';
import { AppComponent } from '../app.component';
import { CartComponent } from './cart/cart.component';
import { DataStorageService } from './data-storage.service';
import { FiltersComponent } from './filters/filters.component';
import { ProductListComponent } from './product-list/product-list.component';

import { ShoppingKartComponent } from './shopping-kart.component';

describe('ShoppingKartComponent', () => {
  
  let component: ShoppingKartComponent;
  let fixture: ComponentFixture<ShoppingKartComponent>;
  let service:DataStorageService;

  beforeEach(async () => {
    service = jasmine.createSpyObj(['fetchProduct']);
    await TestBed.configureTestingModule({
      declarations: [ ShoppingKartComponent, ProductListComponent,ShoppingKartComponent,CartComponent,FiltersComponent,],
      imports:[HttpClientTestingModule,FormsModule,ReactiveFormsModule,AppRoutingModule],
      providers:[{provide:DataStorageService , userValue:service}]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShoppingKartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
