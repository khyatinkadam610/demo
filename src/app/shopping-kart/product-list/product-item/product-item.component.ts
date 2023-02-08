import { Component, Input, OnInit } from '@angular/core';
import { faThumbsUp as fasHeart } from '@fortawesome/free-solid-svg-icons';
import { faThumbsDown as farHeart } from '@fortawesome/free-regular-svg-icons';
import { Product } from 'src/app/models/product.model';
import { MessengerService } from '../../messenger.service';
import { CartService } from '../../cart/cart.service';
import { Router } from '@angular/router';
import { param } from 'cypress/types/jquery';
@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent {
  fasHeart = fasHeart;
  farHeart = farHeart;

  @Input() productItem!:Product;
  constructor(private msg:MessengerService, private cartService:CartService,private route:Router) { }


  handleAddToCart(){
    this.cartService.addProductToCart(this.productItem).subscribe(()=>{
      this.msg.sendMsg(this.productItem);
    })
  }

  OnViewDetails(id:number){
    // console.log("Inside D",id);
    this.route.navigate(['./shop/details',id]);
  }
}
