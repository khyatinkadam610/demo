import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { MessengerService } from '../messenger.service';
import { CartService } from './cart.service';
import { CartItem } from './cartItem.model';
import {faTrash} from '@fortawesome/free-solid-svg-icons'
import { Router } from '@angular/router';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  faCross = faTrash;
  cartItems: CartItem[] = [
    // { id: 1, productId: 1, productName: 'JJK Vol.1', qty: 1, price: 199 },
    // {id:2, productId:3, productName:'JJK Vol.2',qty:1, price:199},
    // {id:3, productId:2, productName:'JJK Vol.3',qty:1, price:199},
    // {id:4, productId:4, productName:'Tshirt',qty:2, price:499}
  ];
  constructor(private msg: MessengerService, private cartService: CartService,private router:Router) { }

  cartTotal:number = 0;

  ngOnInit(): void {
    // console.log("Inside Oninit");
    this.handleSubscription();
    this.loadCartItems();
  }

  handleSubscription() {
    this.msg.getMsg().subscribe(
      () => {
        this.loadCartItems();
      })
  }
  onDeleteItem(id:number){
    for( let i in this.cartItems)
    {
      if(id === this.cartItems[i].id)
      {
        const fbId = this.cartItems[i].firebaseId;
        for(let j in fbId)
        {

          this.cartService.deleteCartItem(fbId[j]).subscribe(()=>{
            this.loadCartItems();
          });
          // this.delete(this.userData.id,this.cartItem[i].firebaseId[j])
        }
        
      }
    }
    
  }
  loadCartItems() {
    this.cartService.getCartItems().subscribe((items: CartItem[]) => {
      // console.log("Insidw Loadcart",items);
      this.cartItems = items;
      this.cartTotal = this.cartService.calcCartTotal();
    })
  }

  // calcCartTotal() {
  //   this.cartTotal = 0;
  //   this.cartItems.forEach(item => {
  //     this.cartTotal += (item.qty * item.price);
  //   })
  // }

  checkOut(){
    this.router.navigate(['checkout']);
    // this.cartService.moveToCheckout(this.cartItems).subscribe(()=>{
    //   this.loadCartItems();
    // });
  }
}

