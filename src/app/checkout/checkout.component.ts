import { Component, OnInit } from '@angular/core';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { CartService } from '../shopping-kart/cart/cart.service';
import { CartItem } from '../shopping-kart/cart/cartItem.model';
import { OrderService } from './order.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  cartItems:CartItem[] = [];
  checkoutList:CartItem[] = [];
  cartTotal:number = 0;
  date = Date.now()
  constructor(private router:Router,private modalService: NgbModal,private cartService:CartService) { }

  faCross = faTrash;
  ngOnInit(): void {
    // this.orderService.getOrders().subscribe();
    this.cartService.getCartItems().subscribe((cart)=>{
      this.cartItems = cart;
      console.log(cart);
      
      this.cartTotal = this.cartService.calcCartTotal();
    });  
  }

  onDeleteItem(id:number){
    
    for( let i in this.cartItems)
    {
      if(id === this.cartItems[i].id)
      {
        // console.log("Inside onDelete",this.cartItems[i].id);
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

  open(content:any) {
    this.checkoutList = this.cartItems;
		const modalRef = this.modalService.open(content,{ size: 'lg' });
    this.cartService.placeAnOrder(this.cartItems).subscribe(()=>{
      this.cartItems = [];
      this.router.navigate(['./shop']);
    });
		// modalRef.componentInstance.name = 'World';
	}

  // open(content:any,data:any){ this.modalService.open(content, { scrollable: true });
// }
}



import { Input } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

@Component({
	selector: 'ngbd-modal-content',
	standalone: true,
  template:``
})
export class NgbdModalContent {
	// @Input() name;
  date = Date.now()
	constructor(public activeModal: NgbActiveModal) {}
}
