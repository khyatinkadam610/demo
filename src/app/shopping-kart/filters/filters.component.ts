import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css']
})
export class FiltersComponent {

  constructor(private productService:ProductService,private router:Router) { }

 OnSubmit(f:NgForm){
  const v1 = f.value.from;
  const v2 = f.value.to;
  // console.log(v1,v2);
  
  this.productService.filterProductByPrice(v1,v2);
 }

 onMyOrders(){
  this.router.navigate(['orders']);
 }
}
