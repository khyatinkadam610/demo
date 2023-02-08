import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Product } from 'src/app/models/product.model';
import { ProductService } from '../product.service';
import {DataStorageService} from '../data-storage.service';
import { CartService } from '../cart/cart.service';
import { MessengerService } from '../messenger.service';

@Component({
  selector: 'app-view-details',
  templateUrl: './view-details.component.html',
  styleUrls: ['./view-details.component.css']
})
export class ViewDetailsComponent implements OnInit {

  constructor(private productService:ProductService,private router:Router,private activatedRoute:ActivatedRoute,private dataStorageService:DataStorageService,private cartService:CartService,private msg:MessengerService) { }
  productItem!:Product;
  ngOnInit(): void {
    
    const id: any = this.activatedRoute.snapshot.params;
    console.log(id);
    
    this.activatedRoute.params.subscribe((param:Params)=>{
      console.log(param);
      this.setProduct(param['id']);
    })
  }
  onBack(){
    this.router.navigate(['./shop'])
  }
  setProduct(id:number){
    this.dataStorageService.fetchProduct().subscribe(()=>{
      const temp = this.productService.getProductById(id);
      this.productItem = temp[0];}
    );
  }

  handleAddToCart(){
    this.cartService.addProductToCart(this.productItem).subscribe(()=>{
      this.msg.sendMsg(this.productItem);
    })
  }
}
