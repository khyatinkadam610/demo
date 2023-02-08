import { Component, OnInit } from '@angular/core';
import { OrderService } from '../checkout/order.service';

@Component({
  selector: 'app-order-confirm',
  templateUrl: './order-confirm.component.html',
  styleUrls: ['./order-confirm.component.css']
})
export class OrderConfirmComponent implements OnInit {

  orders:any[] = [];
  // resData:any;
  constructor(private orderService:OrderService) { }

  ngOnInit(): void {
    this.orderService.getOrders().subscribe((orders)=>{
      // this.resData =orders;
      console.log(orders);

       for(let key in orders){
        this.orders.push(orders[key]); 
        }
    })
  }

}
