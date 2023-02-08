import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from '../product.service';

import { FiltersComponent } from './filters.component';

describe('FiltersComponent', () => {
  let component: FiltersComponent;
  let fixture: ComponentFixture<FiltersComponent>;
  let productService:any;
  let routerService:any;
  beforeEach(async () => {
    productService = jasmine.createSpyObj(['filterProductByPrice']);
    routerService = jasmine.createSpyObj(['navigate']);
    await TestBed.configureTestingModule({
      declarations: [ FiltersComponent ],
      imports:[FormsModule],
      providers:[{provide:ProductService, useValue:productService},{provide:Router,useValue:routerService}]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Should call Submit', () => {
    const testForm = <NgForm>{
      value: {
          from:0,
          to:200
      },
  };
    component.OnSubmit(testForm);
    expect(productService.filterProductByPrice).toHaveBeenCalled();
  });
  it('Should navigate on clicking my orders', () => {
    component.onMyOrders();
    expect(routerService.navigate).toHaveBeenCalled();
  });


});
